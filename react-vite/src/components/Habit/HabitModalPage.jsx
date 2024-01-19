import React from "react";
import { useDispatch } from "react-redux";
// import useHistory from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";

const HabitModalPage = (habit) =>{
    const {closeModal} = useModal
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
    const handleSubmit = () => {

    }
    const handleCancel = () => {
        closeModal()
    }

    return (
        <>
        <form
        className="Edit Habit"
        onSubmit={handleSubmit}
        >
        <h2>Edit Habit</h2>
        <button
        onChange={handleCancel}
        >Cancel</button>
        <button
        type = "submit"
        onClick={handleSubmit}
        >Save</button>


        </form>
        </>
    )
}


export default HabitModalPage
