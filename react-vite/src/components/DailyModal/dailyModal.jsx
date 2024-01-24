import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateHabitMaker } from "../../redux/habit";
import { habitDeleteFetch } from "../../redux/habit";
// import { useDispatch, useSelector } from 'react-redux';


const DailyModal= ({ daily})=>{

    console.log(daily)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [title, setTitle] = useState(daily.title)
    const [notes, setNotes] = useState(daily.notes)
    const [difficulty, setDifficulty] = useState(daily.difficulty)
    const [duration, setDuration] = useState(daily.duration)
    const [tags, setTags] = useState(daily.tags)
    const [startDate, setStartDate] = useState(daily.start)
    const checklist = daily.checklist.
    const [days, setDays] = useState(daily.days)
    const [checklistItem, setChecklistItem] = useState('')
    const [completed, setCompleted] = useState(daily.completed)
    
    useEffect(()=>{
        if(daily.title.length)setIsLoaded(true)
    },[daily])
    console.log(checklist)
    return (<>
        {isLoaded && <div>
        <div>
            <div>Edit Daily</div>
            <div>
                <div>Cancel</div>
                <div>Save</div>
            </div>
            <h3>
                Title
            </h3>
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
            value={checklistItem}
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
    </div>
    }
    </>)
}
export default DailyModal