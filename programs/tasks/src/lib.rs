use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};

declare_id!("23kpfZfQpEujrNnnpMTTGGV2NZ2waBmWpTPMb4s3NZ89");

#[program]
pub mod tasks {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>,name:String) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        user_account.id = 1024;
        user_account.name = name;
        Ok(())
    }
    pub fn add(ctx: Context<Add>, task: String) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        user_account.tasks.push(task);
        Ok(())
    }

    pub fn update(ctx: Context<Update>,index:u32,task:String) -> ProgramResult{        
        let user_account = &mut ctx.accounts.user_account;
        user_account.tasks[index as usize] = task;
        msg!("{:?}",user_account.tasks);
        Ok(())
    }

    pub fn remove(ctx: Context<Update>,index:u32) -> ProgramResult{        
        let user_account = &mut ctx.accounts.user_account;
        user_account.tasks.remove(index as usize);
        msg!("{:?}",user_account.tasks);
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer=user,space=16+64+64)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
}

#[derive(Accounts)]
pub struct Remove<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
}

// Define the program owned accounts.
#[account]
pub struct UserAccount {
    pub id: u64,
    pub name: String,
    pub tasks: Vec<String>
}
