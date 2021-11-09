use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    program_pack::IsInitialized,
    pubkey::Pubkey,
    sysvar::{rent::Rent, Sysvar},
};

use crate::{
    error::TroveError,
    instruction::TroveInstruction,
    state::{MasterTrove, Trove},
};

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = TroveInstruction::unpack(instruction_data)?;

        match instruction {
            TroveInstruction::InitUserTrove { collateral_token } => {
                msg!("Instruction: Init trove");
                Self::process_init_trove(accounts, collateral_token, program_id)
            }
            TroveInstruction::InitMasterTrove {} => {
                msg!("Instruction: Init master trove");
                Self::process_init_master_trove(accounts, program_id)
            }
            TroveInstruction::BorrowFromTrove { amount} => {
                msg!("Initalize new user Trove.");
                Self::process_borrow_trove(accounts, amount, program_id)
            }
        }
    }
    fn process_init_master_trove(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let initializer = next_account_info(account_info_iter)?;

        if !initializer.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let collateral_token_account = next_account_info(account_info_iter)?;
        let token_program_account = next_account_info(account_info_iter)?;

        let master_trove_account = next_account_info(account_info_iter)?;

        let mut master_trove_info = MasterTrove::try_from_slice(&master_trove_account.data.borrow_mut())?;
        
        master_trove_info.is_initialized = true;
        master_trove_info.stable_coin_pubkey = *token_program_account.key;


        let trove_default_data = MasterTrove::default().try_to_vec().unwrap();

        Ok(())
    }
    fn process_borrow_trove(
        accounts: &[AccountInfo],
        amount: Pubkey,
        program_id: &Pubkey,
    ) -> ProgramResult {
            let account_info_iter = &mut accounts.iter();
            // Accounts  {Initializer , User Trove Account , User Stable Coin Account ,  } ...
            let initializer = next_account_info(account_info_iter)?;
            let master_trove_account= next_account_info(account_info_iter)?;
            let user_trove_account= next_account_info(account_info_iter)?;

            let oracle_collateral_account= next_account_info(account_info_iter)?;

            if master_trove_account.owner != program_id{
                return Err( TroveError::InvalidAccountPermission.into());
            }
            if user_trove_account.owner != master_trove_account.key{
                return Err( TroveError::InvalidAccountPermission.into());
            }

            let user_trove_info = Trove::try_from_slice( &user_trove_account.data.borrow_mut() )?;
            let master_trove_info = MasterTrove::try_from_slice( &master_trove_account.data.borrow_mut() )?;

            if user_trove_account.owner != &user_trove_info.initializer_pubkey {
                return Err( TroveError::InvalidAccountPermission.into());
            }
            if  Trove::can_borrow() {
                return Err( TroveError::InvalidAccountPermission.into());
            }

         
            


            
            
            

        let trove_account = create_account_with_seed(initializer.key, to_pubkey, base, seed, lamports, space, owner)

        Ok(())
    }

    fn process_init_trove(
        accounts: &[AccountInfo],
        collateral_token: u64,
        program_id: &Pubkey,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        // Initializers accounts.
        let initializer = next_account_info(account_info_iter)?;
        let initializer_collateral_token_account = next_account_info(account_info_iter)?;
        let initializer_bond_token_account = next_account_info(account_info_iter)?;
        if !initializer.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        // Initializers new trove account.
        let trove_account = next_account_info(account_info_iter)?;

        // Master trove account.
        let master_trove_account = next_account_info(account_info_iter)?;
        let master_trove_info = MasterTrove::try_from_slice(&master_trove_account.data.borrow())?;

        // Token Program account.
        let token_program_account = next_account_info(account_info_iter)?;

        // Checks if the master trove is the owner of this program
        if *master_trove_account.owner != *program_id {
            return Err(ProgramError::IncorrectProgramId);
        }
        // if *borrow_to_receive_account.owner != *initializer.key {
        //     return Err(ProgramError::IncorrectProgramId);
        // }

        let rent = &Rent::from_account_info(next_account_info(account_info_iter)?)?;

        if !rent.is_exempt(trove_account.lamports(), trove_account.data_len()) {
            return Err(TroveError::NotRentExempt.into());
        }

        let mut trove_info = Trove::try_from_slice(&trove_account.data.borrow())?;

        if trove_info.is_initialized() {
            return Err(ProgramError::AccountAlreadyInitialized);
        }

        trove_info.is_initialized = true;
        trove_info.can_liquidate = false;
        trove_info.initializer_pubkey = *initializer.key;
        trove_info.collateral_token_account_pubkey = *initializer_collateral_token_account.key;
        trove_info.borrow_token_to_receive_account_pubkey = *initializer_bond_token_account.key;
        trove_info.debt_amount = 0;
        trove_info.collateral_amount = 0;
        trove_info.collateral_token = collateral_token;

        trove_info.serialize(&mut &mut trove_account.data.borrow_mut()[..])?;

        Ok(())
    }
}
