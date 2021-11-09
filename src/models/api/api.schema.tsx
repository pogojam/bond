import * as borsh from "borsh";

function intToBool(i: number) {
  if (i == 0) {
    return false;
  } else {
    return true;
  }
}

function boolToInt(t: boolean) {
  if (t) {
    return 1;
  } else {
    return 0;
  }
}

const boolMapper = {
  encode: boolToInt,
  decode: intToBool,
};

export class TroveAccount {
  instantiated = false;
  id = "";
  owner = "";
  collateral_token = "";
  collateral = 0;
  borrowed = 0;
  liquidate = 0;

  constructor(
    fields:
      | {
          id: string;
          owner: string;
          instantiated: boolean;
          collateral_token: string;
          collateral: number;
          borrowed: number;
          liquidate: number;
        }
      | undefined = undefined
  ) {
    if (fields) {
      this.id = fields.id;
      this.owner = fields.owner;
      this.instantiated = fields.instantiated;
      this.collateral = fields.collateral;
      this.borrowed = fields.borrowed;
      this.liquidate = fields.liquidate;
      this.collateral_token = fields.collateral_token;
    }
  }
}
export const TroveSchema = new Map([
  [
    TroveAccount,
    {
      kind: "struct",
      fields: [
        ["is_instantiated", "u8", boolMapper],
        ["collateral", "u32"],
        ["borrowed", "u32"],
        ["liquidate", "u32"],
        ["collateral_token", "string"],
        ["owner", "string"],
        ["id", "string"],
      ],
    },
  ],
]);
// The expected size of each greeting account.
export const TROVE_SIZE = borsh.serialize(
  TroveSchema,
  new TroveAccount()
).length;

/// MASTER TROVE

export class MasterTroveAccount {
  is_instantiated = false;
  bond_token_pubkey = "";

  constructor(
    fields:
      | {
          is_instantiated: boolean;
          bond_token_pubkey: string;
        }
      | undefined = undefined
  ) {
    if (fields) {
      this.is_instantiated = fields.is_instantiated;
      this.bond_token_pubkey = fields.bond_token_pubkey;
    }
  }
}
export const MasterTroveSchema = new Map([
  [
    TroveAccount,
    {
      kind: "struct",
      fields: [
        ["is_instantiated", "u8", boolMapper],
        ["bond_token_pubkey", "string"],
      ],
    },
  ],
]);
// The expected size of each greeting account.
export const MASTER_TROVE_SIZE = borsh.serialize(
  TroveSchema,
  new TroveAccount()
).length;
