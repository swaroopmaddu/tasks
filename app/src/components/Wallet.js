import React, { useState } from 'react';
import { AppBar, Button, Grid, TextField, Toolbar, Typography} from '@material-ui/core';
import { useWallet} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
    Program, Provider, web3
} from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js'; 
import idl from '../idl.json';
import TodoItem from './TodoItem';

const { SystemProgram, Keypair } = web3;

const opts = {
    preflightCommitment: "processed"
};
const programID = new PublicKey(idl.metadata.address);


const Wallet =(props)=>{
    
    const [userAccount,setUserAccount] = useState();

    const [value, setValue] = useState('');
    const [userName, setUserName] = useState(''); 
    const [dataList, setDataList] = useState([]);

    const [task, setTask] = useState(null);
    const wallet = useWallet();
 

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    async function init() {
        const provider = await getProvider();
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl, programID, provider);
        /* create an account  */
        let user_keypair = await Keypair.fromSeed(provider.wallet.publicKey.toBytes());
        setUserAccount(user_keypair);

        try {
            try{
                let account = await program.account.userAccount.fetch(userAccount.publicKey);
                if (account != null) {
                    alert("Account already exists");
                    setValue(account.name.toString());
                    setDataList(account.tasks);
                    return;
                }
            } catch(err){
                console.log("account not exists");
            }
            

            /* interact with the program via rpc */
            await program.rpc.initialize(userName.toString(),{
                accounts: {
                    userAccount: userAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [userAccount]
            });

            const account = await program.account.userAccount.fetch(userAccount.publicKey);
            setValue(account.name.toString());
        } catch (err) {
            console.log("Transaction error: ", err);
        }
    }


    async function addTask() {
        if (!task) {
            alert("Enter a task to add it to list");
            return;
        }
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.add(task, {
            accounts: {
                userAccount: userAccount.publicKey
            }
        });

        const account = await program.account.userAccount.fetch(userAccount.publicKey);
        setDataList(account.tasks);
        setTask('');
    }

    async function update(index,task){
        console.log("Called upadte function");
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.update( index,task,{
            accounts: {
                userAccount: userAccount.publicKey
            }
        });

        const account = await program.account.userAccount.fetch(userAccount.publicKey);
        setDataList(account.tasks);
    }

    async function remove(index) {        
        console.log("Called remove function");
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.remove(index,{
            accounts: {
                userAccount: userAccount.publicKey
            }
        });
        const account = await program.account.userAccount.fetch(userAccount.publicKey);
        setDataList(account.tasks);
    }



    
    return <div>
                <AppBar style={{ minHeight: 20 }} justifyContent="space-around" alignItems="center">
                    <Toolbar>
                        <Typography variant="h5" component="div" style={{ flexGrow: 1 }} align="center"> Task Mate </Typography>
                        <WalletModalProvider >
                            <WalletMultiButton />
                        </WalletModalProvider>
                    </Toolbar>
                </AppBar>
                <Toolbar style={{ marginBottom: 10 }}></Toolbar>
                {wallet.connected && <div>
                        {!value && 
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                <TextField fullWidth
                                    helperText="Please enter prefered username"
                                    id="username"
                                    label="Name"
                                    value={userName}
                                    onChange={e =>setUserName(e.target.value)}
                                />  
                                </Grid>
                                <Grid item xs={4}>
                                    <Button fullWidth variant="contained" onClick={init}>initialize</Button>
                                </Grid>
                                
                            </Grid>
                        }
                        {value && <div>
                            <h1>Welcome {value}</h1>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField fullWidth
                                        helperText="Add a task"
                                        id="task"
                                        label="Task"
                                        value={task}
                                        onChange={e => setTask(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" fullWidth onClick={addTask}>Add new Task</Button>
                            </Grid>
                            <ul>
                                {dataList.map(function (element,index) {
                                    return (<TodoItem key={index} index={index} label={element} updatefunc={update} remove={remove} />)
                                })}
                            </ul>
                            </Grid>
                        </div>}
                </div>}
                
            </div>
}
export default Wallet;