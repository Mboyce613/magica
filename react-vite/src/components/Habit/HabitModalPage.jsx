import React from "react";
import { useDispatch } from "react-redux";
// import useHistory from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateHabitMaker } from "../../redux/habit";
import { habitDeleteFetch } from "../../redux/habit";



const HabitModalPage = (habit) =>{
    const {closeModal} = useModal()
    // const [, setState] = React.useState(false);
    const dispatch = useDispatch()
    const [completed, setCompleted] = useState(habit.habit.completed)
    const [difficulty, setDifficulty] = useState(habit.habit.difficulty)
    const [duration, setDuration] = useState(habit.habit.duration)
    const [notes, setNotes] = useState(habit.habit.notes)
    const [positive, setPositive] = useState(habit.habit.positive)
    const [streak, setStreak] = useState(habit.habit.streak)
    const [tags, setTags] = useState(habit.habit.tags)
    const [title, setTitle] = useState(habit.habit.title)
    // const history = useHistory()



    const handleSubmit =async (e) => {

        e.preventDefault()
        if (title.length >= 1){
        const payload = {
                        title:title,
                        id:habit.habit.id,
                        duration:duration,
                        completed:completed,
                        positive:positive,
                        notes:notes,
                        difficulty:difficulty,
                        tags:tags,
                        streak:habit.habit.streak,
                        completed:completed,
                        userId:habit.habit.userId
                        }


        dispatch(updateHabitMaker(payload,habit.habit.id))
        closeModal()
    }
    else {
        alert("Habit Name is required")
    }
    }

    const handleTitle = (e) => setTitle(e.target.value)
    const handleDifficulty = (e) => setDifficulty(e.target.value)
    const handleDuration = (e) => setDuration(e.target.value)
    const handleNotes = (e) => setNotes(e.target.value)
    const handlePositive = (e) => setPositive(e.target.value)
    const handleTags = (e) => setTags(e.target.value)



    const handleCancel = () => {
        // e.preventDefault
        closeModal()
    }
    const handleDelete = (e) => {
        // e.preventDefault
        let check = confirm("Delete this Habit?")
        if (check === true){

        dispatch(habitDeleteFetch(habit.habit.id))
        // setState()
        closeModal()
        }
    }


    return (
        <>
        <div className="habitModalBox">
         <div className="buttonDiv"><button
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
        onSubmit={handleSubmit}
        >
        <div>
        <h2>Edit Habit</h2>

        </div>
        <div>
        <h3>Name of your Habit?</h3>
        <input
            type = "text"
            name = "Title"
            defaultValue={habit.habit.title}
            onChange={handleTitle}
        ></input>
        </div>
        <div>
        <h3>Difficulty?</h3>
        <select
        type = "dropdown"
        defaultValue={habit.habit.difficulty}
        onChange={handleDifficulty}
        >
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option>
        </select>
        </div>
        <div>
        <h3>How Often?</h3>
        <select
        type = "dropdown"
        defaultValue={habit.habit.duration}
        onChange={handleDuration}
        >
        <option value="1">Day</option>
        <option value="2">Week</option>
        <option value="3">Month</option>
        </select>
        </div>
        <div>
            <h3>Notes:</h3>
            <input
            type = "text"
            name = "notes"
            defaultValue={habit.habit.notes}
            onChange={handleNotes}
            >
            </input>
        </div>
        <div>
            <h3>Is this a Positive habit to Build or a Negative habit to Break?</h3>
            <select
        type = "dropdown"
        defaultValue={habit.habit.positive}
        onChange={handlePositive}
        >
        <option value={1}>Positive</option>
        <option value={'False'}>Negative</option>
        </select>
        </div>
        <div>
            <h3>Tags</h3>
            <input
            type = "text"
            name = "Tags"
            defaultValue={habit.habit.tags}
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
        >Save Habit</button>
        </div>
        </form>
        </div>
        </>
    )
}


export default HabitModalPage
