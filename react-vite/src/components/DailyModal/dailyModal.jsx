import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateHabitMaker } from "../../redux/habit";
import { habitDeleteFetch } from "../../redux/habit";

const DailyModal= (daily)=>{
    const dispatch = useDispatch()
    const [title, setTitle] = useState(`${daily.daily.title}`)
    const [notes, setNotes] = useState(`${daily.daily.notes}`)
    const [difficulty, setDifficulty] = useState(`${daily.daily.difficulty}`)
    const [duration, setDuration] = useState(`${daily.daily.duration}`)
    const [tags, setTags] = useState(`${daily.daily.tags}`)
    const [startDate, setStartDate] = useState(`${daily.daily}`)

    const [days, setDays] = useState(`${daily.daily}`)

    const [checklist, setChecklist] = useState(`${daily.daily}`)
    const [completed, setCompleted] = useState(`${daily.daily}`)
    

    return (<>
        <div>
            <div>Edit Daily</div>
            <div>
                <div>Cancel</div>
                <div>Save</div>
            </div>
            <div>
                Title
            </div>
            <input 
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <div>Notes</div>
            <textarea 
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}    
            />
        </div>
        <div>Checklist</div>
        <>
        {Object.values(daily).map(dailyItems =>{

        })}
        </>
        <input
            type="text"
            value={}
        />
        <div>Difficulty</div>
        <div></div>
        <div>Start Date</div>
        <div></div>
        <div>Repeats</div>
        <div></div>
        <div>Repeats Every</div>
        <div></div>
        <div>Repeat On</div>
        <div></div>
        <div>Tags</div>
        
        <div>Delete this Daily</div>
        <div>{daily.daily.title}</div>
    </>)
}
export default DailyModal