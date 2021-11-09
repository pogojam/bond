#!/usr/bin/env ts-node --project ./tsconfig.json
import * as slp_Token from "@solana/spl-token";
import {
  Connection as SolanaConnection,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import tokenJSON from "../../token.json";
import { MASTER_TROVE_SIZE } from "../models/api/api.schema";
import { createKeypairFromFile } from "./util";

const Endponts = {
  DevNet: "https://api.devnet.solana.com",
  MainNet: "https://solana-api.projectserum.com",
};

const WalletPubKey = new PublicKey(
  "9wy4mmyeT28VNQx4BVADo7Y6ju6aTfhkuVePAuRp5DJB"
);
const PROGRAM_ID = PublicKey.default;
const MASTER_TROVE_SEED = "MasterTrove";

const Connection = new SolanaConnection(Endponts.DevNet);

const deriveMasterTrovePubKey = async () => {
  console.log("Deriving MasterTrove address.....");
  return PublicKey.createWithSeed(WalletPubKey, MASTER_TROVE_SEED, PROGRAM_ID);
};

const getMasterTroveAccount = async () => {
  const masterTrovePubKey = await deriveMasterTrovePubKey();
  console.log("Geting MasterTrove account.....");
  return Connection.getAccountInfo(masterTrovePubKey);
};

const createMasterTroveAccount = async () => {
  const Wallet = await createKeypairFromFile("./wallet.json");
  try {
    console.log("Geting MasterTrove minimum balance.....");
    const minBalanace = await Connection.getMinimumBalanceForRentExemption(
      MASTER_TROVE_SIZE,
      "singleGossip"
    );
    const derivedTrovePublicKey = await deriveMasterTrovePubKey();
    const newTroveIx = SystemProgram.createAccountWithSeed({
      programId: PROGRAM_ID,
      space: MASTER_TROVE_SIZE,
      lamports: minBalanace,
      fromPubkey: WalletPubKey,
      newAccountPubkey: derivedTrovePublicKey,
      basePubkey: WalletPubKey!,
      seed: MASTER_TROVE_SEED,
    });
    const tx = new Transaction().add(newTroveIx);

    const result = await sendAndConfirmTransaction(Connection, tx, [Wallet]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const setupStableCoinAuthority = async (newAuthority: PublicKey) => {
  const Wallet = await createKeypairFromFile("./wallet.json");
  const StableToken = new slp_Token.Token(
    Connection,
    new PublicKey(tokenJSON.id),
    slp_Token.TOKEN_PROGRAM_ID,
    Wallet
  );

  console.log("Setting token authority to " + newAuthority.toString());
  await StableToken.setAuthority(
    new PublicKey(tokenJSON.id),
    newAuthority,
    "MintTokens",
    Wallet.publicKey,
    [Wallet]
  );
};

export const initMasterTove = async () => {
  const response = await getMasterTroveAccount();
  if (response) {
    console.log("MasterTrove has already been created.");
    await setupStableCoinAuthority(response.owner);
  }
  if (!response) {
    console.log("MasterTrove account has not been created.....");
    await createMasterTroveAccount();
    console.log("Created Trove Successfully");
  }
};

initMasterTove();
