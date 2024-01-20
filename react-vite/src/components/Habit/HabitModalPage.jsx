import React from "react";
import { useDispatch } from "react-redux";
// import useHistory from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateHabitMaker } from "../../redux/habit";


const HabitModalPage = (habit) =>{
    const {closeModal} = useModal
    const dispatch = useDispatch()
    const [completed, setCompleted] = useState(habit.habit.completed)
    const [difficulty, setDifficulty] = useState(habit.habit.difficulty)
    const [duration, setDuration] = useState(habit.habit.duration)
    const [notes, setNotes] = useState(habit.habit.notes)
    const [positive, setPositive] = useState(habit.habit.positive)
    // const [streak, setStreak] = useState(habit.habit.streak)
    const [tags, setTags] = useState(habit.habit.tags)
    const [title, setTitle] = useState(habit.habit.title)
    // const history = useHistory()



    const handleSubmit =async (e) => {
        e.preventDefault()

    //    function handleClick() {
    //     forceUpdate();
    // }
    // handleClick()
    //    if (!Object.values(errors).length) {
    //     const cityState = location.split(',')
    //     console.log("groupId",groupId)
        const payload = {
                        title:title,
                        id:habit.habit.id
                        }
        console.log("payload",payload)

        let newHabit = await dispatch(updateHabitMaker(payload,habit.habit.id))

            // history.push(`/groups/${group.id}`)
    //   }
    closeModal()
    }

    const handleTitle = (e) => setTitle(e.target.value)



    const handleCancel = () => {
        closeModal()
    }
    console.log("from habitModal",habit)

    return (
        <>
        <form
        className="Edit Habit"
        onSubmit={handleSubmit}
        >
        <div>
        <h2>Edit Habit</h2>
        <button
        onChange={handleCancel}
        >Cancel</button>
        <button
        type = "submit"
        onClick={handleSubmit}
        >Save</button>
        </div>
        <div>
        <h3>Name of your new Habit:</h3>
        <input
            type = "text"
            name = "Title"
            defaultValue={habit.habit.title}
            onChange={handleTitle}
        ></input>
        </div>
        <div>
        <h3>Difficulty:</h3>
        <select
        type = "dropdown"
        defaultValue={habit.habit.difficulty}
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
            >
            </input>
        </div>
        <div>
            <h3>Is this a Positive habit to Build or a Negative habit to Break?</h3>
            <select
        type = "dropdown"
        defaultValue={habit.habit.positive}
        >
        <option value={true}>Positive</option>
        <option value={false}>Negative</option>
        </select>
        </div>
        <div>
            <h3>Tags</h3>
            <input
            type = "text"
            name = "Tags"
            defaultValue={habit.habit.tags}
        ></input>
        </div>
        </form>
        </>
    )
}


export default HabitModalPage
