import React from "react";
import TodosItem from "./todosItem";
import classes from "./todosItems.module.css";
// import { useContext } from "react";
// import TodosContext from "../todos-context";

const TodosItems = (props) =>{
    // const ddd = useContext(TodosContext);
    // console.log("todosItems  "+ddd.todos.name);
    let listItems = props.todos.map((td,ind)=>{
        return  <TodosItem key={ind} todo={td} todosUpd={props.setTodos}/>
    })
    
    return <ul className={classes.TodosItems}>{listItems}</ul>;
    // return <TodosContext.Consumer>
    //     {(ctx)=>{
    //         console.log(ctx.todos.name);
    //         return <ul className={classes.TodosItems}>
    //     {listItems}
    // </ul>}}
        
    // </TodosContext.Consumer>
}

export default TodosItems;