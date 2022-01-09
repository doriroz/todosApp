import React from "react";
import TodosItem from "./todosItem";
import classes from "./todosItems.module.css";

const TodosItems = (props) =>{
    let listItems = props.todos.map((td,ind)=>{
        return  <TodosItem key={ind} todo={td} />
    })
    
    return <ul className={classes.TodosItems}>{listItems}</ul>;
}

export default TodosItems;