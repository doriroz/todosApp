import React ,{ useState , useEffect } from "react";
import Header from "./Util/header";
import Input from "./Components/todosInput";
import Footer from "./Util/footer";
import TodosItems from "./Components/todosItems";
import useHttp from "./Hooks/useHttp";
export const TodosContext = React.createContext();

function App() {

const getActiveListArray = (todos) => {
    return todos.filter(td=>{
        return td.active == true; 
    })
}

const getNotActiveListArray = (todos) => {
    return todos.filter(td=>{
        return td.active == false; 
    })
}
        
const todoList = (todos) => {
    const todosArr = [];
    for(const key in todos){
    todosArr.push({
        numKey:key,
        id:todos[key].id,
        name:todos[key].name,
        active:todos[key].active,
        isEditable:todos[key].isEditable})
    }
    setIsLoading(1);
    console.log(todosArr);
    return todosArr;
}
    
const setTodosRequest = (todosObj) => {
    let todosArrNew = [];
    const todosArr = todoList(todosObj);
    console.log(todosArr);
    if(tab == "Completed") {
        todosArrNew = getNotActiveListArray(todosArr);   
    }
    else{
        todosArrNew = getActiveListArray(todosArr);
    }

    setLstCount(todosArrNew.length);

    if(tab=="Active" || tab=="Completed"){
        setTodos(todosArrNew);
    }
    else{
        setTodos(todosArr);  
    }

}
            
const [todos,setTodos] = useState([]);
const [todo,setTodo] = useState("");
const [lstCount,setLstCount] = useState(0);
const [isLoading,setIsLoading]=useState(0);
const [tab,setTab] = useState("");
const [tabs,setTabs] = useState([{
    name:'All',
    active:false
},
{
    name:'Active',
    active:false
},
{
    name:'Completed',
    active:false
}])

const httpData =
useHttp({url:"https://todosapp-59567-default-rtdb.firebaseio.com/todo.json"},
setTodosRequest);

const {sendRequest:fetchTodos} = httpData;
    
useEffect(()=>{

    // setTodosRequest(tab);
    fetchTodos();
},[todo,tab])


async function addItem(td,name) {
    let item = { id: `id-${name}`, name: name, active: true, isEditable: false };
    console.log(JSON.stringify(item));
    const response = await fetch("https://todosapp-59567-default-rtdb.firebaseio.com/todo.json",{
    method:'POST',
    body:JSON.stringify(item),
    headers:{
        'Content-Type':'application/json',
    }

    })
    
    console.log(response);
    const data = await response.json();
    console.log(data);

    setTodo(item);
}

const content = !isLoading ? 
<p>Todos List is loading....</p>:
    <div style={{width:"inherit"}}>
    <Input todos={todos} addItem={addItem}/>
    <TodosItems todos={todos}/>
    <Footer tabs={tabs} todos={todos} len={lstCount} onClear={getNotActiveListArray}/>
    </div>
    
return (
    <TodosContext.Provider value={{
        todos:todos,
        tabs:tabs,
        tab:tab, 
        setTodo:setTodo,
        setTodos:setTodos,
        // saveTodos:saveTodos,
        setLstCount:setLstCount,
        setTab:setTab}}>  
        <div style={{width:"60vw"}}>
            <Header title={"todos"}/>
            {content}
        </div>
    </TodosContext.Provider>
    
);  
}

export default App;  


// const  getListByStatus = (todos) => {
// let todoArrNew = JSON.parse(todos);
// console.log(tab);
// if(tab == "Completed") {
//     todoArrNew = getNotActiveListArray(todoArrNew);   
// }
// else{
//     todoArrNew = getActiveListArray(todoArrNew);
// }
// return todoArrNew;
// }

// const getRnewTodos = (todos) => {

// const todosEvery = getListByStatus(todos);
// todosEvery.map(td=>console.log(`TD : ${td.active}`));
// setLstCount(todosEvery.length);

// if(tab=="Active" || tab=="Completed"){
//     setTodos(todosEvery);
// }
// else{
//     setTodos(JSON.parse(localStorage.getItem("Todos")));
// } 
// }

// const fetchTodos = async () => {
// let todosArr = [];
// let todoArrNew = [];
// try{
//     const response = await fetch("https://todosapp-59567-default-rtdb.firebaseio.com/todo.json");
//     const todosData = await response.json();
        
//     for(const key in todosData){
//         todosArr.push({
//         numKey:key,
//         id:todosData[key].id,
//         name:todosData[key].name,
//         active:todosData[key].active,
//         isEditable:todosData[key].isEditable})
//     }
//     setIsLoading(1);
// }
// catch(error){
//     console.log(error);
// }

// if(tab == "Completed") {
//     todoArrNew = getNotActiveListArray(todosArr);   
// }
// else{
//     todoArrNew = getActiveListArray(todosArr);
// }

// setLstCount(todoArrNew.length);

// if(tab=="Active" || tab=="Completed"){
//     setTodos(todoArrNew);
// }
// else{
//     setTodos(todosArr);  
// }
// }
