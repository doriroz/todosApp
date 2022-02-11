import React ,{useState} from "react";
import classes from "./todosInput.module.css";
const TodosInput = (props) =>{
    
    function addItemUpd(event){
        if(event.code === "Enter"){
            props.addItem(props.todos,event.target.value);
            event.target.value = "";    
        }
    }  
    // style={{width:"50vw"}}
    return <input  
        className={classes.todosInput} 
        type="text" 
        placeholder="What need to be done?"
        onKeyUp={event=>addItemUpd(event)}
        />
    ;
}

export default TodosInput;