import React, { useState } from 'react';
import { IconButton, Checkbox, TextField  } from '@material-ui/core';
import { FaPen,FaCheck } from 'react-icons/fa';


const TodoItem = (props) => {
    const [editable, setEditable] = useState(false);
    const [task, setTask] = useState(props.label);


    return <div>
        <Checkbox color="primary" onClick={()=>props.remove(props.index)} />
            {!editable ? 
                <span>{task}</span> : 
            <TextField id="task" value={task} variant="standard" onChange={event => setTask(event.target.value)}/>}
            &nbsp;&nbsp;&nbsp;
            <IconButton color="primary" size="small" aria-label="upload picture" component="span">
            {!editable ? <FaPen onClick={() => setEditable(true)} /> : <FaCheck onClick={() => { props.updatefunc(props.index,task);setEditable(false)}} />}
            </IconButton>

    </div>
}


export default TodoItem;