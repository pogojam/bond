import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Instance, types } from "mobx-state-tree";
import React, { createContext, ReactNode, useEffect } from "react";
import { ApiModel } from "./api/api.model";
import { TroveStore } from "./trove/trove/trove.model";

const Model = types.model({
  TroveStore: types.optional(TroveStore, {}),
  // WalletStore: types.optional(),
  Api: types.optional(ApiModel, {}),
});

export interface IModelRoot extends Instance<typeof Model> {}

export const store = Model.create({});
// Create context for store.
export const ModelContext = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  useEffect(() => {
    store.Api.setupApi(wallet, connection);
  }, [wallet, connection]);
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

const Context = createContext(store);
export const useStore = () => React.useContext(Context);
