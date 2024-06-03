import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

import { useEffect } from "react";
const INITIAL_STATE = {  // obj 
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

//The purpose of storing user data in localStorage is to 
//maintain it across sessions. By updating localStorage whenever 
//the user state changes, we ensure that the stored data accurately reflects the
// current state of the application.

export const Context = createContext(INITIAL_STATE); // new context obj global obj 
// context provider responsible for providing the context to its child components 
export const ContextProvider = ({children}) =>{
    const[state,dispatch] = useReducer(Reducer,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return (
        <Context.Provider value={{  // rendering 
            user : state.user,
            isFetching : state.isFetching,
            error : state.error,
            dispatch,
        }}>{children}</Context.Provider>
    )

};