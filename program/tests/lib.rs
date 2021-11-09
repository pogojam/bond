use std::borrow::BorrowMut;

use borsh::BorshSerialize;
use helloworld::{entrypoint::process_instruction, instruction::TroveInstruction, state::Trove};
use solana_program::{rent::Rent, system_instruction::SystemInstruction, system_program, sysvar};
use solana_program_test::*;
use solana_sdk::{
    account::Account,
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    signature::{Keypair, Signer},
    transaction::Transaction,
};

#[tokio::test]
async fn test_helloworld() {
    let mock_instruction = TroveInstruction::InitTrove {
        collateral_token: 0,
    };

    let program_id = Pubkey::new_unique();

    let trove_pubkey = Pubkey::new_unique();
    let trove_data = Trove::default().try_to_vec().unwrap();

    let mut mock_instruction_data = mock_instruction.try_to_vec().unwrap();
    mock_instruction_data.push(0);

    let payer_pubkey = Keypair::new();
    let payer_account = Account {
        lamports: 5,
        owner: payer_pubkey.pubkey(),
        ..Account::default()
    };
    let collateral_pubkey = Pubkey::new_unique();
    let borrow_pubkey = Pubkey::new_unique();

    let mut program_test = ProgramTest::new(
        "Trove", // Run the BPF version with `cargo test-bpf`
        program_id,
        processor!(process_instruction), // Run the native version with `cargo test`
    );

    //  Adds payer account to env.
    program_test.add_account(
        payer_pubkey.pubkey(),
        Account {
            lamports: 5,
            ..Account::default()
        },
    );
    //  Adds trove account to env.
    program_test.add_account(
        trove_pubkey,
        Account {
            lamports: Rent::default().minimum_balance(trove_data.len()),
            data: trove_data,
            owner: program_id,
            ..Account::default()
        },
    );
    // Adds collateral account to env
    program_test.add_account(
        collateral_pubkey,
        Account {
            lamports: 5,
            owner: payer_pubkey.pubkey(),
            ..Account::default()
        },
    );

    // // Adds borrow account to env
    // program_test.add_account(
    //     borrow_pubkey,
    //     Account {
    //         lamports: 100,
    //         owner: payer.pubkey(),
    //         ..Account::default()
    //     },
    // );

    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;
    // let mut init_transaction = Transaction::new_with_payer(
    //     &[Instruction::new_with_bytes(
    //         program_id,
    //         &mock_instruction_data,
    //         vec![
    //             AccountMeta::new(payer.pubkey(), false),
    //             AccountMeta::new(trove_pubkey, false),
    //             AccountMeta::new(borrow_pubkey, false),
    //             AccountMeta::new(trove_pubkey, false),
    //         ],
    //     )],
    //     Some(&payer.pubkey()),
    // );

    let mut init_transaction = Transaction::new_with_payer(
        &[Instruction::new_with_bytes(
            program_id,
            &mock_instruction_data.borrow_mut(),
            vec![
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new(collateral_pubkey, false),
                AccountMeta::new(borrow_pubkey, false),
                AccountMeta::new(trove_pubkey, false),
                AccountMeta::new(sysvar::rent::id(), false),
            ],
        )],
        Some(&payer.pubkey()),
    );

    init_transaction.sign(&[&payer], recent_blockhash);
    banks_client
        .process_transaction(init_transaction)
        .await
        .unwrap();

    // Verify account has zero greetings
    let greeted_account = banks_client
        .get_account(escrow_pubkey)
        .await
        .expect("get_account")
        .expect("greeted_account not found");
    assert_eq!(
        GreetingAccount::try_from_slice(&greeted_account.data)
            .unwrap()
            .counter,
        0
    );
}
