import React from "react";
import { useDispatch } from "react-redux";
// import useHistory from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateToDoMaker } from "../../redux/toDo";
// import { toDoDeleteFetch } from "../../redux/toDo";
import { toDoDeleteFetch } from "../../redux/toDo";



const ToDoModalPage = (toDo) =>{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;



    const [title,setTitle] = useState(toDo.toDo.title)
    const [notes,setNotes] = useState(toDo.toDo.notes)
    const [checklist,setChecklist] = useState(toDo.toDo.checklist)
    const [difficulty,setDifficulty] = useState(toDo.toDo.difficulty)
    const [dueDate,setDueDate] = useState(currentDate)
    const [tags,setTags] = useState(toDo.toDo.tags)
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    let listItems = checklist?checklist.split("##"):["No Items"]

    listItems.pop()

    const handleSubmit =async (e) => {
        e.preventDefault()
        if (title.length >= 1){

        const payload = {
                        title:title,
                        id:toDo.toDo.id,
                        checklist:checklist,
                        notes:notes,
                        difficulty:difficulty,
                        tags:tags,
                        dueDate:dueDate,
                        userId:toDo.toDo.userId,
                        completed:false
                        }


        dispatch(updateToDoMaker(payload,toDo.toDo.id))
        closeModal()
    }else{
        alert ("Name is required")
    }}

    const handleCancel = () => {

        closeModal()
    }
    const handleDelete = (e) => {

        let check = confirm("Delete this To Do Item?")
        if (check === true){

        dispatch(toDoDeleteFetch(toDo.toDo.id))
        // setState()
        closeModal()
        }
    }

    const handleTitle = (e) => setTitle(e.target.value)
    const handleNotes = (e) => setNotes(e.target.value)
    const handleDummy = (e) => {}
    const handleDifficulty = (e) => setDifficulty(e.target.value)
    const handleDueDate = (e) => setDueDate(e.target.value)
    const handleTags = (e) => setTags(e.target.value)


    const handleChecklist = (e) =>{
        if (e.target.value.length > 1){
        if (e.key === 'Enter'){
        let oldChecklist = checklist
        oldChecklist +=(`${e.target.value}##`)
        setChecklist(oldChecklist)
        e.currentTarget.value = ""
        }
        }}
    const handleCheckDelete = (item)=>{
        let oldChecklist = checklist.split("##")
        oldChecklist.splice(oldChecklist.indexOf(item),1)
        setChecklist(oldChecklist.join("##"))
    }

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
             onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            className="Edit Habit"
            >
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
                onKeyDown={handleChecklist}
                ></input>
                <ul>
                {listItems.map(item=>(
                <div>
                <input type = "checkbox" onChange={handleDummy}/>
                {item}
                <button class="fa-regular fa-trash-can" style={{border:0}} value={item} onClick={(e)=>{e.preventDefault(),handleCheckDelete(item)}}></button>
                </div>
                ))}</ul>

            </div>
            <h3>Difficulty?</h3>
        <select
        type = "dropdown"
        defaultValue={toDo.toDo.difficulty}
        onChange={handleDifficulty}
        >
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option>
        </select>
        <div>
        <h3>Due Date?</h3>
        <input
            type="date"
            min={currentDate}
            defaultValue={currentDate}
            onChange={handleDueDate}
            placeholder="MM/DD/YYYY"
        />
        </div>
        <div>
            <h3>Tags</h3>
            <input
            type = "text"
            name = "Tags"
            defaultValue={toDo.toDo.tags}
            onChange={handleTags}
        ></input>
        </div>
        <div
        className="submitHabit"
        >
        <button
        className="submitHabitButton"
        type = "submit"
        onClick={handleSubmit}
        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        >Save To Do List</button>
        </div>
        </form>
        </div>
        </>
    )
}

export default ToDoModalPage
