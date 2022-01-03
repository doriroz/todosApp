import { useState , useEffect } from "react";
import Header from "./Util/header";
import Input from "./Components/todosInput";
import Footer from "./Util/footer";
import TodosItems from "./Components/todosItems";
// import {TodosContext} from "./todos-context";
import {TodosContext} from "./Context/todos-context";

function App() {
  
    const [todos,setTodos] = useState([]);
    const [newTodo,setNewTodo] = useState("");
    const tabs = ['All','Active','Completed'];
   
    useEffect(()=>{
      let todosFromStroage = localStorage.getItem("Todos");
      if(todosFromStroage){
        setTodos(JSON.parse(todosFromStroage));
      }
      else{
        setTodos(todos);
      }
      // console.log(todosFromStroage);
      
    },[newTodo])
    
    function saveTodos(todos){
        localStorage.setItem("Todos",JSON.stringify(todos));
    }
    
    function addItem(td, name) {
      let item = { id: `id-${name}`, name: name, active: true, isEditable: false };
          
      td.push(item);
      console.log(td);
      saveTodos(td);
      setNewTodo(item);
    }
  
    // value={{
    //   todos:todos
    // }}
    return (
      <TodosContext.Provider value={{todos:todos}}>  
          <Header title={"todos"}/>
          <Input todos={todos} addItem={addItem}/>
          <TodosItems todos={todos} todosUpd={setTodos}/>
          <Footer tabs={tabs} todos={todos} />
      </TodosContext.Provider>
      
    );  
  }
  
  export default App;  