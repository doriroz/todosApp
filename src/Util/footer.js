import React ,{useContext} from "react";
import classes from "./footer.module.css";
import {TodosContext} from "../App";
import styled from "styled-components";

const Footer = (props) =>{

    // const Button = styled.button`
    // text-decoration:${props.todo.active==false?"line-through":"none"};
    // `

    // const [style, setStyle] = useState("cont");
  
    // const changeStyle = () => {
    //     console.log("you just clicked");
    //     setStyle("cont2");
    // };
    
    const todosCtx = useContext(TodosContext);
    console.log(props.todos.length);
    todosCtx.todos.map(td=>console.log(td));
    
const clearHandler = (e) => {
   //let notActiveArr = props.onClear(todos);
   let clear = e.target.dataset.name;
   const activeTodos = [];
   for(let i = 0;i<props.todos.length;i++)
   {
       if(props.todos[i].active){
            activeTodos.push(props.todos[i]);
       }
   }
   todosCtx.saveTodos(activeTodos);
   todosCtx.setTab(clear);
}

    const getTabHandler = (e) => {
        let tab = e.target.dataset.name;
        console.log(tab);
        let initTabsArr = props.tabs.map(t => {
            t.active = false;
            return t;
        });
        let tabIndex = props.tabs.indexOf(props.tabs.find(tb=>tb.name == tab));
        console.log("indexxxxxx : "+tabIndex);
        initTabsArr[tabIndex].active = true;
        todosCtx.setTab(tab);
    }

    // className={tab.active==true?classes.linkSelected:classes.linkNotSelected}
    // className={tab.active==true?classes.listSelected:classes.listNotSelected}
    let tabs = props.tabs.map((tab,ind)=>{
        return <li key={ind} className={classes.listSelected}>
            <a href={`#${tab.name}`} 
               data-name={tab.name} 
               onClick={(event) => getTabHandler(event)}
               className={classes.linkSelected}>{tab.name}</a></li>
    })

    // let tabs = props.tabs.map((tab,ind)=>{
    //     return <li key={ind} className={tab.active==true?classes.listSelected:classes.listNotSelected}>
    //         <a href={`#${tab.name}`} 
    //            data-name={tab.name} 
    //            onClick={(event) => getTabHandler(event)} 
    //            className={tab.active==true?classes.linkSelected:classes.linkNotSelected}>{tab.name}</a></li>
    // })


    return <footer className={classes.footer}>
        <p><span id="listcount"></span>{props.len} item left</p>
        <ul>{tabs}</ul>
        <div>
        <button onClick={clearHandler} 
         data-name="Clear"
         style={{backgroundColor:"inherit"}}>Clear Completed</button>
        </div>
        
    </footer>
}

export default Footer;
