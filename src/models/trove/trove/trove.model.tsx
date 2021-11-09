import { getRoot, Instance, types } from "mobx-state-tree";
import { IModelRoot } from "../../model";

const Trove = types.model({
  id: types.identifier,
  debt: types.optional(types.number, 100),
  collateral: types.optional(types.number, 0),
  token: types.string,
});

export const TroveStore = types
  .model({
    tokens: types.optional(types.array(types.string), ["SOL"]),
    troves: types.optional(types.array(Trove), []),
    activeTrove: types.maybeNull(types.reference(Trove)),
  })
  .actions((self) => ({
    openTrove(token: string) {
      debugger;
      const { Api } = getRoot<IModelRoot>(self);
      Api.createUserTroveAccount(token);
    },
    async populateTroves() {
      const { Api } = getRoot<IModelRoot>(self);
      const userTroveAccounts = await Promise.all(
        self.tokens.map((token) => {
          return Api.getUserTroveAccount(token);
        })
      );

      userTroveAccounts.forEach((trove) => {
        self.troves.push(
          Trove.create({
            debt: trove?.borrowed!,
            token: trove?.collateral_token!,
            id: "123",
          })
        );
        debugger;
      });
    },
  }));

export interface ITroveStore extends Instance<typeof TroveStore> {}
