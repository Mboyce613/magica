import React from "react";
import { useRef } from "react";
// import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits } from "../../redux/habit";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const Habit = ({userId})=>{
    // const [habits, setHabits] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const habits = useSelector((state)=> state.habits)
    // console.log(userId)
    useEffect(() =>{
        dispatch(getAllHabits(userId))
        .then(() => setIsLoading(false));
    },[])


if (!isLoading) {
    return (
        <>
        <div>Hello from Habits</div>
        <div>Habits</div>
        {/* {console.log("habits",Object.values(habits))} */}
        <ul>{Object.values(habits).map(habit =>(
        <li>{habit.title}</li>))}</ul>
        </>)
}
}

export default Habit
