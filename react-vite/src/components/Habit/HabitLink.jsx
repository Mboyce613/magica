import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import HabitModelPage from "./HabitModalPage.jsx";
// import { UseSelector } from "react-redux/es/hooks/useSelector.js";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersExp } from "../../redux/session.js";
import { updateHabit } from "../../redux/habit.js";


const HabitLink = (habit) =>{
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    // console.log("session",sessionUser)
    // console.log("Habit",habit)

    const handleCompleted = (e) => {
        if (habit.habit.completed === false){
        let expAdd = 0
        if (habit.habit.difficulty===3){
            expAdd = 9
        }
        if (habit.habit.difficulty===2){
            expAdd = 7
        }
        if (habit.habit.difficulty===1){
            expAdd = 5
        }
        expAdd += sessionUser.exp
        // console.log(expAdd)

        let payload = {
            exp: expAdd,
            id:sessionUser.id
        }
        dispatch(updateUsersExp(payload,sessionUser.id))
        dispatch
        }
    }

    const handleNotCompleted = (e) => {

    }

    return (
        <>
        <div className="habitNavBox">
        <button
        // className="plusButton"
        class="fa-solid fa-circle-plus"
        onClick={handleCompleted}
        ></button>
        {/* <div>Hello from HabitLink</div> */}
        <OpenModalButton
        buttonText={habit.habit.title}
        modalComponent={<HabitModelPage habit = {habit.habit}/>}
        buttonClass={"habitModalButton"}
        />
        <button
        class="fa-solid fa-circle-minus"
        onClick={handleNotCompleted}
        ></button>
        </div>
        </>
    )
}

export default HabitLink
