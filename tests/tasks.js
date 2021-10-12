const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe('Tasks', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  it("Creates an account)", async () => {

    const userAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Tasks;

    /* Call the initialize function via RPC */
    await program.rpc.initialize("Spiderman",{
      accounts: {
        userAccount: userAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [userAccount],
    });

    /* Fetch the account and check the value of count */
    const account = await program.account.userAccount.fetch(userAccount.publicKey); 
    assert.ok(account.name.toString() == "Spiderman");
  });
});
