import React, { useContext,useRef } from "react";
import classes from "./todosItem.module.css";
import {TodosContext} from "../App";
import styled from "styled-components";
import useHttp from "../Hooks/useHttp1";



const TodosItem = (props) => {
    const {sendRequest:deleteRequest} = useHttp();
    const todoInputRef = useRef();
    const todosCtx = useContext(TodosContext);
    
    const InActiveStyled = styled.label`
        text-decoration:${props.todo.active==false?"line-through":"none"};
        color:${props.todo.active==false?"#aaa":"black"};
        font-style:${props.todo.active==false?"italic":"none"};
    `;

    const isChecked = (td) => {
        return td.active === true ? "" : "checked";
    }

    const deleteItem = (todos,id) => {
        let item = todos.find(todoid => todoid.id == id);
        const urlHttp = `https://todosapp-59567-default-rtdb.firebaseio.com/todo/${item.numKey}.json`
        deleteRequest({url:urlHttp,method:'DELETE'},(item)=>todosCtx.setTodo(item))

        // todosCtx.setTodo(item);
    }


    // const deleteItem = async(todos,id) => {
    //     let item = todos.find(todoid => todoid.id == id);
    //     console.log(item);
    //     const url = `https://todosapp-59567-default-rtdb.firebaseio.com/todo/${item.numKey}.json`;
    //     const response = await fetch(url,{
    //     method:'DELETE',
    //     })
      
    //     todosCtx.setTodo(item);
    // }

   
    const toggle = (id) => {
        // let todos = JSON.parse(localStorage.getItem("Todos"));
        let todos = todosCtx.todos;
        console.log(todos);
        let item = todos.find((td) => td.id == id);
        let index = todos.indexOf(item);
        todos[index].active = !todos[index].active;
        
        todosCtx.tabs.map(t => {
            t.active = false;
            return t;
        });
        todosCtx.saveTodos(todos);        
        todosCtx.setTodo(item);
    }

    const setEditable = (todos,id) => {
        let item = todos.find((td) => td.id == id);
        
        let index = todos.indexOf(item);
        todos[index].isEditable = true;
            
        todosCtx.saveTodos(todos);
        todosCtx.setTodo(item);
    }

    const mapEditValue = (todos,id) => {
        
        let item = todos.find((td) => td.id == id);
        item.name = todoInputRef.current.value;
        item.id = `id-${todoInputRef.current.value}`;
        item.isEditable = false;

        todosCtx.saveTodos(todos);
        todosCtx.setTodo(item);
    }

    const onClickEvent = (e) => {
        deleteItem(todosCtx.todos,e.target.dataset.id);
    }

    const onChangeEvent = (e) => {
        toggle(e.target.dataset.id);
    }

    const onDbClickEvent = (e) => {
        // e.preventDefault();
        console.log(e.target);
        setEditable(todosCtx.todos,e.target.dataset.id);
    }

    const onKeyDownEvent = (e) => {  
            
        if (e.code === "Enter") {
            mapEditValue(todosCtx.todos,e.target.dataset.id);
        }
    }
    
    // // ON LABEL
    // // htmlFor={getId(props.todo.name)}
    const isEditable = props.todo.isEditable > 0
    ? <input 
        type='text' 
        defaultValue={props.todo.name} 
        data-id={props.todo.id} 
        data-name={props.todo.name} 
        ref={todoInputRef}
        onKeyDown={event=>{onKeyDownEvent(event)}} />
        // onblur='onExitFocus' 
        // />
    : <InActiveStyled 
        data-id={props.todo.id}
        data-name={props.todo.name}
        onDoubleClick={event=>{onDbClickEvent(event)}}>{props.todo.name}</InActiveStyled>;
        
    return <li className={classes.todosItem}>
        <div>
            <input 
                type="checkbox" 
                data-id={props.todo.id}
                checked = {isChecked(props.todo)}  
                onChange={event=>onChangeEvent(event)}
                />
            {isEditable}
        </div>
        <a href="#" onClick={event=>{onDbClickEvent(event)}}><i className="fas fa-edit" data-id={props.todo.id}></i></a>
        <button 
            data-id={props.todo.id} 
            onClick={(event)=>onClickEvent(event)}>&times;</button>
    </li>
}


export default TodosItem;
