import React, { useContext } from "react";
import classes from "./todosItem.module.css";
// import TodosContext from "../todos-context";
// import { useContext } from "react";
import {TodosContext} from "../Context/todos-context";

const TodosItem = (props) => {
    const todoCtx = useContext(TodosContext);
    console.log(`todoContex : ${todoCtx.isLoggod}`);
    
    const isChecked = (td) => {
        console.log(td.active);
        return td.active == true ? "checked" : "";
    }

    function deleteItem(todos,id) {
        let t = todos.find(todoid => todoid == id);
        console.log("t: "+t);
        let index = todos.indexOf(t);
        todos.splice(index, 1);
        return todos;
    }

    function onClickEvent(e) {
        props.setTodos(deleteItem(e.target.id));
    }

    // ON LABEL
    // onclick='onChangeEvent(event)'
    // ondblclick='onDbClickEvent(event)'
    // htmlFor={getId(props.todo.name)}
    const isEditable = props.todo.isEditable > 0
    ? <input type='text' value={props.todo.name} data-id={props.todo.id} data-name={props.todo.name} onkeyup='onKeyDownTxt' onblur='onExitFocus' />
    : <label data-name={props.todo.name}>{props.todo.name}</label>;

    
    const onChangeEvent = (e) => {
        e.preventDefault();
        // setState(toggle(e.target.dataset.id));
      }

    const toggle = (todos,id) => {
        console.log(id);
        let item = todos.filter((val) => val.id == id);
      
        item[0].active = !item[0].active;
        console.log(todos);
        return todos;
    }

    // isChecked={isChecked(todoCtx)}
    // data-id={todoCtx.id}
    return <li className={classes.todosItem}>
        <div>
        <input type="checkbox" defaultChecked={isChecked(props.todo)}/>
        {/* {props.todo.name} */}
        {isEditable}
        </div>
        <button onClick={(e)=>onClickEvent(e)}>&times;</button>
    </li>
    // onclick={onClickEvent}
}




// const getId = (name) => {
//     return `id-${name}`;
// }



// function onKeyDownTxt(e) {
//     if (e.code === "Enter") {
//       setState(mapEditValue(e.target.dataset.name));
//     }
// }
  
// function mapEditValue(name) {
//     let new_todos = todoArr.filter((val) => val.name == name);
//     for (let i = 0; i < new_todos.length; i++) {
//       new_todos[i].name = name;
//       new_todos[i].id = `id-${name}`;
//     }
//     return todoArr;
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


// ${
//     todo.isEditable > 0
//       ? `<input type='text' value='${todo.name}' data-id=${todo.id} data-name=${todo.name} onkeyup='onKeyDownTxt' onblur='onExitFocus'>`
//       : `<label for=${getId(todo.name)} data-name=${
//           todo.name
//         } onclick='onChangeEvent(event)' ondblclick='onDbClickEvent(event)'>${
//           todo.name
//         }</label>`
//   }

export default TodosItem;