import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import HabitModelPage from "./HabitModalPage.jsx";


const HabitLink = (habit) =>{


    const handleCompleted = () => {

    }
    const handleNotCompleted = () => {

    }


    // console.log("from habitLink",habit)
    return (
        <>
        <div>
        <button>Plus</button>
        {/* <div>Hello from HabitLink</div> */}
        <OpenModalButton
        buttonText={habit.habit.title}
        modalComponent={<HabitModelPage habit = {habit.habit}/>}
        />
        <button>Minus</button>
        </div>
        </>
    )
}

export default HabitLink
