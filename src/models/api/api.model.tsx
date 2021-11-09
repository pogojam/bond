import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection as TConnection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { deserialize } from "borsh";
import { autorun, makeAutoObservable } from "mobx";
import { getRoot, types } from "mobx-state-tree";
import { IModelRoot } from "../model";
import { TroveAccount, TroveSchema, TROVE_SIZE } from "./api.schema";

let Connection: TConnection;
let Wallet: WalletContextState;

const TROVE_PROGRAM_ID = PublicKey.default;

export const ApiModel = types.model({}).actions((self) => ({
  async deriveTrovePublicKey(token: string) {
    const seed = `Tr${token}`;
    const trovePubKey = await PublicKey.createWithSeed(
      Wallet.publicKey!,
      seed,
      TROVE_PROGRAM_ID
    );
    return trovePubKey;
  },
  async getUserTroveAccount(token: string) {
    const trovePubKey = await this.deriveTrovePublicKey(token);
    const response = await Connection.getAccountInfo(trovePubKey);
    if (!response) return response;
    return deserialize(TroveSchema, TroveAccount, response?.data!);
  },
  async createUserTroveAccount(token: string) {
    const seed = `Tr${token}`;
    try {
      const minBalanace = await Connection.getMinimumBalanceForRentExemption(
        TROVE_SIZE,
        "singleGossip"
      );
      const derivedTrovePublicKey = await this.deriveTrovePublicKey("SOL");
      const newTroveIx = SystemProgram.createAccountWithSeed({
        programId: TROVE_PROGRAM_ID,
        space: TROVE_SIZE,
        lamports: minBalanace,
        fromPubkey: Wallet.publicKey!,
        newAccountPubkey: derivedTrovePublicKey,
        basePubkey: Wallet.publicKey!,
        seed: seed,
      });
      const tx = new Transaction().add(newTroveIx);
      const result = await Wallet.sendTransaction(tx, Connection);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  setupApi(wallet: WalletContextState, connection: TConnection) {
    const { TroveStore } = getRoot<IModelRoot>(self);
    Wallet = makeAutoObservable(wallet);
    Connection = connection;
    autorun(() => {
      if (Wallet.connected) {
        TroveStore.populateTroves();
      }
    });
  },
}));
