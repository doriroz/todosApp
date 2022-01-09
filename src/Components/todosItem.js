import React, { useContext,useRef } from "react";
import classes from "./todosItem.module.css";
import {TodosContext} from "../App";
import styled from "styled-components";

const TodosItem = (props) => {
    const todoInputRef = useRef();
    const todosCtx = useContext(TodosContext);
    // // console.log(...TodosContext.todos);
    todosCtx.todos.map(td=>console.log(`todoContex : ${td.name}`));

    const InActiveStyled = styled.label`
        text-decoration:${props.todo.active==false?"line-through":"none"};
        color:${props.todo.active==false?"#aaa":"black"};
        font-style:${props.todo.active==false?"italic":"none"};    
    `;

    const isChecked = (td) => {
        console.log(td.active);
        return td.active == true ? "checked" : "";
    }

    const deleteItem = (todos,id) => {
        let item = todos.find(todoid => todoid.id == id);
        let index = todos.indexOf(item);
        todos.splice(index, 1);

        todosCtx.saveTodos(todos);
        todosCtx.setTodo(item);
    }

    
    const toggle = (todos,id) => {
        console.log(id);
        let item = todos.find((td) => td.id == id);
        console.log(item);
        let index = todos.indexOf(item);
        todos[index].active = !todos[index].active
        
        todosCtx.saveTodos(todos);
        todosCtx.setTodo(item);
    }

    const setEditable = (todos,id) => {
        let item = todos.find((td) => td.id == id);
        console.log(item);
        let index = todos.indexOf(item);
        todos[index].isEditable = true;
            
        todosCtx.saveTodos(todos);
        todosCtx.setTodo(item);
    }

    const mapEditValue = (todos,id) => {
        console.log(todoInputRef.current.value);
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
        // e.preventDefault();
        console.log(e.target.dataset.id);
        toggle(todosCtx.todos,e.target.dataset.id);
    }

    const onDbClickEvent = (e) => {
        // e.preventDefault();
        console.log(e.target);
        setEditable(todosCtx.todos,e.target.dataset.id);
    }

    const onKeyDownEvent = (e) => {  
        console.log(e.target.dataset.id);    
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
            defaultChecked={isChecked(props.todo)}
            onChange={(event=>{onChangeEvent(event)})}
            />
        {isEditable}
        </div>
        <a href="#" onClick={event=>{onDbClickEvent(event)}}><i className="fas fa-edit" data-id={props.todo.id}></i></a>
        <button 
            data-id={props.todo.id} 
            onClick={(event)=>onClickEvent(event)}
            >&times;</button>
    </li>
}


export default TodosItem;


// const getId = (name) => {
//     return `id-${name}`;
// }

// function onExitFocus(e) {
//     for (let i = 0; i < todoArr.length; i++) {
//       todoArr[i].isEditable = false;
//       if (todoArr[i].name === e.target.dataset.name) {
//         todoArr[i].id = `id-${e.target.value}`;
//         todoArr[i].name = e.target.value;
//       }
//     }
//     setLocalStorage(todoArr);
//     render(todoArr, getListByStatus(todoArr, selectedTab), selectedTab);
//   }

