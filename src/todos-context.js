import React ,{ createContext } from "react";


export const TodosContext = createContext(
    // {todos:[{id:'',name:'',active: true, isEditable: false}]}
    {todos:[],isLoggod:true}
    
)


// const TheStoreProvider = (props) => {
 
//     return (
//       <TodosContext.Provider value={{ data: false }}>
//         {props.children}
//       </TodosContext.Provider >
//     );
//   }
//   export default TheStoreProvider;

// export default TodosContext;

// from stackoverflow
// When you use export const ... You import it with curly brackets { }
// If you used export default ... You should import without the curly brackets.



// **** suitable for import {TodosContext} ****
// export const TodosContext = createContext(
//     {todos:[]}
// )
