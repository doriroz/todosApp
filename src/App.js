import React ,{ useState , useEffect } from "react";
import Header from "./Util/header";
import Input from "./Components/todosInput";
import Footer from "./Util/footer";
import TodosItems from "./Components/todosItems";

export const TodosContext = React.createContext();

function App() {
  
    // const tabs = ['All','Active','Completed'];
    // const tabs = [{
    //   name:'All',
    //   active:false
    // },
    // {
    //   name:'Active',
    //   active:false
    // },
    // {
    //   name:'Completed',
    //   active:false
    // }];

    // save tab array with localStorage

    const [todos,setTodos] = useState([]);
    const [todo,setTodo] = useState("");
    const [lstCount,setLstCount] = useState(0);
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

    // const providerValues = {
    //   todos:todos,
    //   setTodo:setTodos,
    //   saveTodos:saveTodos,
    //   // setValue:(todos)=>setTodos(todos),
    //   // saveValue:(todos)=>saveTodos(todos),
    // }
    
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

  const  getListByStatus = (todos) => {
      let todoArrNew = JSON.parse(todos);
      console.log(tab);
      if(tab == "Completed") {
        todoArrNew = getNotActiveListArray(todoArrNew);   
      }
      else{
        todoArrNew = getActiveListArray(todoArrNew);
      }
      return todoArrNew;
    }

    const getRnewTodos = (todos) => {
      console.log("ttttoooooddddddoooooosssssss "+todos);
      const todosEvery = getListByStatus(todos);
      todosEvery.map(td=>console.log(`TD : ${td.active}`));
      setLstCount(todosEvery.length);
      
      if(tab=="Active" || tab=="Completed"){
        console.log("ttttoooooddddddoooooosssssss "+todosEvery.length);
        setTodos(todosEvery);
      }
      else{
        setTodos(JSON.parse(localStorage.getItem("Todos")));
      } 
    }

    // localStorage.clear();
    useEffect(()=>{
      let todosFromStroage = localStorage.getItem("Todos");
      if(todosFromStroage){
        getRnewTodos(todosFromStroage);
      }
      else{
        setTodos(todos);
      }
    },[todo,tab])
    
    function saveTodos(todos){
        console.log(JSON.stringify(todos));
        localStorage.setItem("Todos",JSON.stringify(todos));
    }
    
    function addItem(td, name) {
      let item = { id: `id-${name}`, name: name, active: true, isEditable: false };
          
      td.push(item);
      console.log(td);
      saveTodos(td);
      setTodo(item);
    }
  
    // const todoLen = () =>{
    //   return getActiveListArray(todos).length;
    // }
    // value={{
    //   todos:todos
    // }}
    // {todos:todos,tabs:tabs,newTodo:newTodo}
    // todos:todos,tabs:tabs,setTodos:setTodos
    // {todos:todos,setTodo:setTodo,saveTodos:saveTodos}
    // providerValues

    // setTabs:setTabs
    return (
      <TodosContext.Provider value={{
            todos:todos,
            tabs:tabs,
            tab:tab, 
            setTodo:setTodo,
            setTodos:setTodos,
            saveTodos:saveTodos,
            setLstCount:setLstCount,
            setTab:setTab}}>  
            <div style={{width:"60vw"}}>
              <Header title={"todos"}/>
              {/* <div style={{width:"60vw"}}> */}
              
              <Input todos={todos} addItem={addItem}/>
              <TodosItems todos={todos}/>
              <Footer tabs={tabs} todos={todos} len={lstCount} onClear={getNotActiveListArray}/>
              {/* </div> */}
            </div>
              
            
            
      </TodosContext.Provider>
      
    );  
  }
  
  export default App;  