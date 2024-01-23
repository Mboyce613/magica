
import React from "react";
import { useRef } from "react";
// import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllToDos } from "../../redux/toDo";
import ToDoLink from "./ToDoLink";


const ToDo = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const toDos = useSelector((state)=> state.toDos)
    useEffect(() =>{
        dispatch(getAllToDos(userId.userId))
        .then(() => setIsLoading(false));
    },[dispatch,])

    const handleSubmit = () =>{

    }
    const handleTitle = (e) => setTitle(e.target.value)

    if (!isLoading){
    return(
        <>
        <div className="toDoBox">
        <div style={{fontSize:25,padding:5,backgroundColor:"orange"}}>To Do's</div>
        <form
        onSubmit={handleSubmit}
        className = "NewToDoForm"
        >
            <input
            className="newHabit"
            type = "text"
            value = {title}
            placeholder="Enter a new To Do Item"
            onChange={handleTitle}
            ></input>
        </form>

        <div className="toDoNav">{Object.values(toDos).map(toDo =>(
        <ToDoLink className="toDoList" toDo = {toDo}/>))}</div>
        </div>
        </>
    )}
}

export default ToDo;
