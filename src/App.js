import React ,{ useState , useEffect } from "react";
import Header from "./Util/header";
import Input from "./Components/todosInput";
import Footer from "./Util/footer";
import TodosItems from "./Components/todosItems";
// import {TodosContext} from "./todos-context";
// import {TodosContext} from "./Context/todosContext";

export const TodosContext = React.createContext();

function App() {
  
    const [todos,setTodos] = useState([]);
    const [todo,setTodo] = useState("");
    const tabs = ['All','Active','Completed'];
   
    // const providerValues = {
    //   todos:todos,
    //   setTodo:setTodos,
    //   saveTodos:saveTodos,
    //   // setValue:(todos)=>setTodos(todos),
    //   // saveValue:(todos)=>saveTodos(todos),
    // }

    useEffect(()=>{
      let todosFromStroage = localStorage.getItem("Todos");
      
      if(todosFromStroage){
        console.log(todosFromStroage);
        setTodos(JSON.parse(todosFromStroage));
        console.log(todos);
      }
      else{
        setTodos(todos);
      }
    },[todo])
    
    function saveTodos(todos){
        localStorage.setItem("Todos",JSON.stringify(todos));
    }
    
    function addItem(td, name) {
      let item = { id: `id-${name}`, name: name, active: true, isEditable: false };
          
      td.push(item);
      console.log(td);
      saveTodos(td);
      setTodo(item);
    }
  
    // value={{
    //   todos:todos
    // }}
    // {todos:todos,tabs:tabs,newTodo:newTodo}
    // todos:todos,tabs:tabs,setTodos:setTodos
    // {todos:todos,setTodo:setTodo,saveTodos:saveTodos}
    // providerValues
    return (
      <TodosContext.Provider value={{todos:todos,setTodo:setTodo,saveTodos:saveTodos}}>  
          <Header title={"todos"}/>
          <Input todos={todos} addItem={addItem}/>
          <TodosItems todos={todos}/>
          <Footer tabs={tabs} todos={todos} />
      </TodosContext.Provider>
      
    );  
  }
  
  export default App;  