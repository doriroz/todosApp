import { useEffect } from "react";
const useHttp = () =>{
    // const todoNewArrDara = [];
    const sendRequest = async (httpObj,appData) => {        
        try{
            const response = await fetch(httpObj.url,{
                method:httpObj.method?httpObj.method :'GET',
                headers:httpObj.headers? httpObj.headers:{},
                body:httpObj.body?JSON.stringify(httpObj.body):null,
            });
            if(!response.ok){
                throw new Error("request failed");
            }

            const todosData = await response.json();
            console.log(todosData);
            // todoNewArrDara = appData(todosData);                              
            appData(todosData);
        }
        catch(error){
          console.log(error);
        }
        
    }
    return {sendRequest} ;
}

export default useHttp;