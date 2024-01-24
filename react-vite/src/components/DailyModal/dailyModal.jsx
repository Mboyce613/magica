import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { updateHabitMaker } from "../../redux/habit";
import { habitDeleteFetch } from "../../redux/habit";

const DailyModal= (daily)=>{
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [duration, setDuration] = useState('')
    const [tags, setTags] = useState('')
    const [startDate, setStartDate] = useState('')
    const [days, setDays] = useState('')
    const [checklist, setChecklist] = useState('')
    const [completed, setCompleted] = useState('')
    

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
            <textarea/>
            <div>Notes</div>
        </div>
        <div>Checklist</div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
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