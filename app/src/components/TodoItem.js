import React, { useState } from 'react';


import { IconButton, Grid, Checkbox, TextField  } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';

import {
    Program, Provider, web3
} from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl.json';
import { FaPen,FaCheck } from 'react-icons/fa';


const TodoItem = (props) => {
    const [editable, setEditable] = useState(false);
    const [task,setTask] = useState(props.label);
    return <div>
            <Checkbox color="primary" />
            {!editable ? 
                <span>{task}</span> : 
            <TextField id="task" value={task} variant="standard" onChange={event => setTask(event.target.value)}/>}
            &nbsp;&nbsp;&nbsp;
            <IconButton color="primary" size="small" aria-label="upload picture" component="span">
                {!editable ? <FaPen onClick={() => setEditable(true)} /> : <FaCheck onClick={() => { setEditable(false)}} />}
            </IconButton>

    </div>
}


export default TodoItem;