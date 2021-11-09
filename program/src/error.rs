use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum TroveError {
    /// Invalid instruction
    #[error("Invalid Instruction")]
    InvalidInstruction,
    #[error("Account is not Rent exempt.")]
    NotRentExempt,
    #[error("Account has already been initialized.")]
    AccountAlreadyInitialized,
    #[error("Invalid collateral type.")]
    InvalidCollateralType,
    #[error("Invalid account permission.")]
    InvalidAccountPermission,
}

impl From<TroveError> for ProgramError {
    fn from(e: TroveError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
