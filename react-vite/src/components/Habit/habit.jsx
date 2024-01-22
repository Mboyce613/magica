import React from "react";
import { useRef } from "react";
// import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits } from "../../redux/habit";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import HabitLink from "./HabitLink";
import { createHabitMaker } from "../../redux/habit";

const Habit = ({userId})=>{
    // const [habits, setHabits] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [, setState] = React.useState(false);
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const habits = useSelector((state)=> state.habits)
    // console.log(userId)
    useEffect(() =>{
        dispatch(getAllHabits(userId))
        .then(() => setIsLoading(false));
    },[dispatch,])

    const handleSubmit =async (e) => {
        e.preventDefault()

        const payload = {
                        title:title,
                        completed:false,
                        difficulty:1,
                        duration:1,
                        notes:"",
                        positive:true,
                        streak:0,
                        tags:"",
                        userId:userId
                        }
        // console.log("payload",payload)

        let newHabit = await dispatch(createHabitMaker(payload))
        dispatch(getAllHabits(userId))

            // history.push(`/groups/${group.id}`)
    //   }
    }

    const handleTitle = (e) => setTitle(e.target.value)

if (!isLoading) {
    return (
        <>
        <div>Habits</div>
        <div>
        <form
        onSubmit={handleSubmit}
        className = "NewHabit"
        >
            <input
            type = "text"
            placeholder="Enter a new Habit"
            onChange={handleTitle}
            ></input>
        </form>
        {/* {console.log("habits",Object.values(habits))} */}
        <div>{Object.values(habits).map(habit =>(
        <HabitLink habit = {habit}/>))}</div>
        </div>
        </>)
}
}

export default Habit
