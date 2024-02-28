import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersExp } from "../../redux/session.js";
import ToDoModalPage from "./ToDoModalPage.jsx";
import "./ToDo.css"



const ToDoLink = (toDo) =>{
    let checklist = toDo.toDo.checklist
    let listItems = checklist?checklist.split("##"):["No Items"]
    listItems?.pop()


    return (
        <>
        <div className="toDoNavBox">
            <div className="toDoCheck">
            <input
            className="listInput"
            type="checkbox" />
            <OpenModalButton
        buttonText={toDo.toDo.title}
        modalComponent={<ToDoModalPage toDo = {toDo.toDo}/>}
        buttonClass={"habitModalButton"}
        /></div>
         <ul>
                {listItems.map(item=>(
                <div>
                <input
                className="listCheck"
                type = "checkbox"/>
                {item}
                </div>
                ))}</ul>

        </div>
        </>
    )
}

export default ToDoLink
