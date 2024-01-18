import React from "react";
import { useRef } from "react";
// import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits } from "../../redux/habit";

const Habit = ({userId})=>{
    console.log ("userId from habits",userId)
    const [habits, setHabits] = useState("")
    const dispatch = useDispatch()
    const habit = useSelector((state)=> state.habits)

    useEffect(() =>{
        dispatch(getAllHabits(userId))
    },[dispatch, userId])
    
    return (
        <div>Hello from Habits</div>
    )
}

export default Habit
