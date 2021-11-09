use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
    pubkey::Pubkey,
};
use switchboard_program::{AggregatorState, RoundResult};

#[derive(BorshSerialize, BorshDeserialize, Default, Debug)]
pub struct Trove {
    pub is_initialized: bool,
    pub can_liquidate: bool,
    pub initializer_pubkey: Pubkey,
    pub collateral_token_account_pubkey: Pubkey,
    pub borrow_token_to_receive_account_pubkey: Pubkey,
    pub debt_amount: u64,
    pub collateral_amount: u64,
    pub collateral_token: u64,
}

impl IsInitialized for Trove {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Trove {
    pub fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let trove_account = Trove::try_from_slice(&src)?;
        Ok(trove_account)
    }

    pub fn can_borrow(oracle_collateral_account: &AccountInfo) -> bool {
        let aggregator: =
            match switchboard_program::get_aggregator(&oracle_collateral_account) {
                Ok(state) => state,
                Err(err) => err,
            };

        let round_result: RoundResult = switchboard_program::get_aggregator_result(&aggregator);

        false
    }
}

#[derive(BorshSerialize, BorshDeserialize, Default, Debug)]
pub struct MasterTrove {
    pub is_initialized: bool,
    pub stable_coin_pubkey: Pubkey,
}

impl IsInitialized for MasterTrove {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl MasterTrove {
    pub fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let trove_account = MasterTrove::try_from_slice(&src)?;
        Ok(trove_account)
    }
    // fn pack_into_slice(&self, dst: &mut [u8]) {}
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unpack_from_slice() {
        let trove = Trove::default();
        let unpacked_trove =
            Trove::unpack_from_slice(trove.try_to_vec().unwrap().borrow_mut()).unwrap();
        assert_eq!(
            format!("{:?}", unpacked_trove),
            format!("{:?}", Trove::default())
        );
    }
}
