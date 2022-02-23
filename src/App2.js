import React ,{ useState , useEffect } from "react";
import Header from "./Util/header";
import Input from "./Components/todosInput";
import Footer from "./Util/footer";
import TodosItems from "./Components/todosItems";
import useHttp from "./Hooks/useHttp";
export const TodosContext = React.createContext();

function App() {
          
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


  const fetchTodos = async () => {
    let todosArr = [];
    let todoArrNew = [];
    try{
      const response = await fetch("https://todosapp-59567-default-rtdb.firebaseio.com/todo.json");
      const todosData = await response.json();
          
      for(const key in todosData){
          todosArr.push({
            numKey:key,
            id:todosData[key].id,
            name:todosData[key].name,
            active:todosData[key].active,
            isEditable:todosData[key].isEditable})
      }
      setIsLoading(1);
    }
    catch(error){
      console.log(error);
    }
    
    if(tab == "Completed") {
      todoArrNew = getNotActiveListArray(todosArr);   
    }
    else{
      todoArrNew = getActiveListArray(todosArr);
    }

    setLstCount(todoArrNew.length);

    if(tab=="Active" || tab=="Completed"){
      setTodos(todoArrNew);
    }
    else{
      setTodos(todosArr);  
    }    
  }

    // localStorage.clear();
    useEffect(()=>{
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
      
      const data = await response.json();
      setTodo(item);
    }
  
    const content = !isLoading ? 
    <p>Todos List is loading....</p>:
      <div style={{width:"inherit"}}>
        <Input todos={todos} addItem={addItem}/>
        <TodosItems todos={todos}/>
        <Footer tabs={tabs} todos={todos} len={lstCount} onClear={getNotActiveListArray}/>
      </div>
      
    // value={{
    //   todos:todos
    // }}
    // {todos:todos,tabs:tabs,newTodo:newTodo}
    // todos:todos,tabs:tabs,setTodos:setTodos
    // {todos:todos,setTodo:setTodo,saveTodos:saveTodos}
    // providerValues

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