import React from "react";
import classes from "./footer.module.css";

const footer = (props) =>{

let tabs = props.tabs.map((tab,ind)=>{
    return <li key={ind} className={tab==props.tab?classes.tabSelected:null}>
        <a href={`#${tab}`}>{tab}</a></li>
})

let listcount = (todos) => {
    let todosNew = todos.filter((todo) => todo.active == true);
    return todosNew.length;
}

    return <footer className={classes.footer}>
        <p><span id="listcount"></span>{listcount(props.todos)} item left</p>
        <ul>{tabs}</ul>
    </footer>
}

export default footer;
