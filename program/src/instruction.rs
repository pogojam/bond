use crate::error::TroveError::{self, InvalidCollateralType, InvalidInstruction};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{program_error::ProgramError, pubkey::Pubkey};
use std::convert::TryInto;

// inside instruction.rs
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum TroveInstruction {
    /// Starts the trade by creating and populating an Trove account and transferring ownership of the given temp token account to the PDA
    ///
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account of the person initializing theTrove
    /// 1. `[]` Token account for the asset they will be borrowing against (collateral) , owned by the initializer
    /// 2. `[]` The initializer's token account for the stable coin (Bond).
    /// 3. `[]` The Master Trove account.
    /// 3. `[writable]` The trove account, it will hold all necessary info about their trove.
    /// 4. `[]` The rent sysvar
    /// 5. `[]` The token program
    InitUserTrove {
        /// The amount party A expects to receive of token Y
        collateral_token: u64,
    },
    /// Starts the trade by creating and populating an Trove account and transferring ownership of the given temp token account to the PDA
    ///
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account of the person initializing theTrove
    /// 1. `[]` The Master Trove account.
    /// 2. `[]` Stable Coin Token mint account.
    /// 3. `[]` The token program
    InitMasterTrove {},
    /// Starts the trade by creating and populating an Trove account and transferring ownership of the given temp token account to the PDA
    ///
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account of the person initializing theTrove
    /// 1. `[]` The Master Trove Account. 
    /// 2. `[]` The User Trove Account. 
    /// 2. `[]` The Collateral Oracle Account. 
    // InitMasterTrove {
    //     /// The amount party A expects to receive of token Y
    //     collateral_token: u64,
    // },
    BorrowFromTrove { amount:u8 },
}

impl TroveInstruction {
    /// Unpacks a byte buffer into a [TroveInstruction](enum.TroveInstruction.html).
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;
        Ok(match tag {
            0 => Self::InitUserTrove {
                collateral_token: Self::unpack_collateral_type(rest)?,
            },
            1 => Self::InitMasterTrove {},
            _ => return Err(InvalidInstruction.into()),
        })
    }
    fn unpack_collateral_type(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(InvalidInstruction)?;
        Ok(amount)
    }
}
