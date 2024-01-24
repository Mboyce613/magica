import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import HabitModelPage from "./HabitModalPage.jsx";
// import { UseSelector } from "react-redux/es/hooks/useSelector.js";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersExp } from "../../redux/session.js";
import { updateHabit } from "../../redux/habit.js";
import useSound from "use-sound";
import plusSound from "./sounds/plus.mp3"
// import minusSound from "../../../public/sounds/minus.mp3"

const HabitLink = (habit) =>{
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const playSound = useSound(plusSound)

    const handleCompleted = (e) => {
        if (!habit.habit.completed){
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

        let payload = {
            exp: expAdd,
            id:sessionUser.id
        }
        dispatch(updateUsersExp(payload,sessionUser.id))
        playSound
        }}else{
            alert('Habit Already Done for Today!')
        }
    }

    const handleNotCompleted = (e) => {
        // useSound(minusSound)
    }

    return (
        <>
        <div className="habitNavBox">
        <button
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
