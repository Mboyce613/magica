import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { deleteDaily, updateDaily } from "../../redux/daily";

// import { useDispatch, useSelector } from 'react-redux';


const DailyModal= ({ daily })=>{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let dailyDays = daily.days
    const formatedTags = daily.tags.split('"').filter(ele =>ele.length > 1 && !ele.includes(','))
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [title, setTitle] = useState(daily.title)
    const [notes, setNotes] = useState(daily.notes)
    const [difficulty, setDifficulty] = useState(daily.difficulty)
    const [duration, setDuration] = useState(daily.duration)
    const [startDate, setStartDate] = useState(currentDate)
    const daysChecklist = daily.checklist.split('"').filter(ele =>ele.length > 1 && !ele.includes(','))
    let fillDaysCheck ={}
    for(let i = 0;i < daysChecklist.length; i++){
        fillDaysCheck[`${i}`] = daysChecklist[i]
    }
    const [tags, setTags] = useState(daily.tags)
    const [daysSel, setDaysSel] = useState(dailyDays)
    const [checklistItem, setChecklistItem] = useState('')
    const [completed, setCompleted] = useState(daily.completed)

    console.log(startDate, '----')
    
    const handleCancel = (e) =>{
        closeModal()
    }

    const handleDelete = (e) =>{
        let check = confirm('Are you sure you want to delete this Daily?')
        if(check === true) {
            dispatch(deleteDaily(daily))
            closeModal()
        }
    }

    const handleSave = () =>{
        dispatch(updateDaily({
            "id":daily.id,
            "title": title,
            "notes":notes,
            "difficulty":difficulty,
            "duration":duration,
            "tags":`${formatedTags}`,
            "start_date":`${new Date(startDate).toISOString().slice(0, 10)}`,
            "days":dailyDays,
            "checklist":daily.checklist,
            "completed":daily.completed,
        }))
        closeModal()
    }

    const handleEnter = (e)=>{
        if(e.key === "Enter"){
            if(!checklistItem.length){
                return null
            }else{
                daysChecklist.push(checklistItem)
            }
        }
    }

    useEffect(()=>{
        if(daily.days.length)setIsLoaded(true)
    },[daily])
    // console.log(daysChecklist.split('"'), '---------')
    // console.log(checklist)
    return (<>
        {isLoaded && <div>
        <div>
            <h3>Edit Daily</h3>
            <div className="habitModalBox" >
                <div  onClick={handleCancel}>Cancel</div>
                <div onClick={handleSave}>Save</div>
            </div>
            <h3>
                Title
            </h3>
            <input 
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <h3>Notes</h3>
            <textarea 
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}    
            />
        </div>
        <h3>Checklist</h3>
        <>
        {daysChecklist.forEach(ele=>{
            <div key={ele.length}>
                {ele}
            </div>
        })}
        </>
        <input
            type="text"
            value={checklistItem}
            onChange={(e)=>setChecklistItem(e.target.value)}
            onKeyDown={handleEnter}
        />
        
        <h3>Difficulty</h3>
        <select
        type = "dropdown"
        defaultValue={difficulty}
        onChange={(e)=>setDifficulty(e.target.value)}
        >
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option>
        </select>
        <h3>Start Date</h3>
        <input
            type="date"
            name="startDate"
            min={currentDate}
            onChange={(e)=>setStartDate(e.target.value)}
            defaultValue={currentDate}
        />
        <h3>Repeats</h3>
        <select
        type = "dropdown"
        defaultValue={duration}
        onChange={(e)=>setDuration(e.target.value)}
        >
        <option value="1">Daily</option>
        <option value="2">Weekly</option>
        <option value="3">Monthly</option>
        <option value="4">Yearly</option>
        </select>
        <div>
            <h3>Tags</h3>
            <input
            type = "text"
            name = "Tags"
            defaultValue={formatedTags}
            onChange={(e)=>setTags(e.target.value)}
        ></input>
        </div>
        
        <div class="fa-regular fa-trash-can" onClick={handleDelete}>Delete this Daily</div>
    </div>
    }
    </>)
    // return(
    //     <div>hello</div>
    // )
}
export default DailyModal