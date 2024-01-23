import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersExp } from "../../redux/session.js";
import ToDoModalPage from "./ToDoModalPage.jsx";



const ToDoLink = (toDo) =>{
    return (
        <>
        <div className="toDoLinkBox">
            <input type="checkbox" />
            <OpenModalButton
        buttonText={toDo.toDo.title}
        modalComponent={<ToDoModalPage toDo = {toDo.toDo}/>}
        buttonClass={"habitModalButton"}
        />
        </div>
        </>
    )
}

export default ToDoLink
