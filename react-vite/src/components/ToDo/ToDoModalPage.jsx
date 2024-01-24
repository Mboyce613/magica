import React from "react";
import { useDispatch } from "react-redux";
// import useHistory from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateToDoMaker } from "../../redux/toDo";
// import { toDoDeleteFetch } from "../../redux/toDo";



const ToDoModalPage = (toDo) =>{

    const [title,setTitle] = useState(toDo.toDo.title)
    const [notes,setNotes] = useState(toDo.toDo.notes)
    const [checklist,setChecklist] = useState(toDo.toDo.checklist)
    const [difficulty,setDifficulty] = useState(toDo.toDo.difficulty)
    const [dueDate,setDueDate] = useState(toDo.toDo.dueDate)
    const [tags,setTags] = useState(toDo.toDo.tags)
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    let listItems = checklist?checklist.split("##"):null

    const handleSubmit =async (e) => {
        e.preventDefault()

        const payload = {
                        title:title,
                        id:toDo.toDo.id,
                        checklist:checklist,
                        completed:toDo.toDo.completed,
                        notes:notes,
                        difficulty:difficulty,
                        tags:tags,
                        dueDate:dueDate,
                        userId:toDo.toDo.userId
                        }


        dispatch(updateToDoMaker(payload,toDo.toDo.id))
        closeModal()
    }

    const handleCancel = () => {
        // e.preventDefault
        closeModal()
    }
    const handleDelete = (e) => {
        // e.preventDefault
        let check = confirm("Delete this To Do Item?")
        if (check === true){

        // dispatch(habitDeleteFetch(toDo.toDo.id))
        // setState()
        closeModal()
        }
    }
    const handleTitle = (e) => setTitle(e.target.value)
    const handleNotes = (e) => setNotes(e.target.value)
    const handleDummy = (e) => {}
    const handleChecklist = (e) =>{
        setChecklist(`${e.target.value}##`)

        // addCheckItems()
        }
    const addCheckItems = (checklist)=>{
        // console.log(listItems)
    }
    addCheckItems()

    // console.log(toDo)
    console.log(listItems)
    // listItems = ["thing"]

    return (
        <>
        <div className="habitModalBox">

            <div className="buttonDiv">
            <button
            class="fa-regular fa-trash-can"
            onClick={handleDelete}
            ></button>
            <button
        className="submitHabitButton"
        onClick={handleCancel}
        type="cancel"
        >Cancel</button>
            </div>

            <form
            className="Edit Habit"
            onSubmit={handleSubmit}>
            <h1>Edit To Do</h1>
            <h3>Name of your To Do List?</h3>
        <input
            type = "text"
            name = "Title"
            defaultValue={toDo.toDo.title}
            onChange={handleTitle}
        ></input>
        <h3>Notes:</h3>
            <input
            type = "text"
            name = "notes"
            defaultValue={toDo.toDo.notes}
            onChange={handleNotes}
            >
            </input>
            <div>
                <h3>Checklist:</h3>
                <input
                type="text"
                placeholder="Enter a checklist Item"
                onClick={handleChecklist}
                ></input>
                <ul>
                {listItems.map(item=>(
                <div>
                <input type = "checkbox" onChange={handleDummy}/>
                {item}
                </div>
                ))}</ul>
            </div>

            </form>
        </div>
        </>
    )
}

export default ToDoModalPage
