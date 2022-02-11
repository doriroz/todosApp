import React from "react";
import TodosItem from "./todosItem";
import classes from "./todosItems.module.css";

const TodosItems = (props) =>{
    // props.todos.map(()=>console.log(props.todos));
    // console.log(typeof props.todos);    
    

    //when completed , active or all , pass todos only with active , inactive or all 
    const listItems = props.todos.map((td,ind)=>{
        console.log(props.todos.length);
        console.log("list todo "+td);
        // props.todos.map(td=>console.log(td));
        return <TodosItem key={ind} todo={td} /> ;
    });
    // const listItems = props.todos.map((td,ind)=>{
    //     // console.log(td);
    //     return <TodosItem key={ind} todo={td} />;
    // })
    
    return <ul className={classes.TodosItems}>{listItems}</ul>;
}

export default TodosItems;