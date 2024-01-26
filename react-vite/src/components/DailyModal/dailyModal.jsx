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
    const begDate = daily.start_date
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
    const [checklist, setChecklist] = useState(daily.checklist)
    const [completed, setCompleted] = useState(daily.completed)
    let listItems = checklist?checklist.split(","):["No Items"]
    
    
    const handleCancel = (e) =>{
        closeModal()
    }
    
    const handleDelete = (e) =>{
        let check = confirm('Are you sure you want to delete this Daily?')
        if(check === true) {
            dispatch(deleteDaily(dailyId))
            closeModal()
        }
    }
    
    const handleChecklist = (e) =>{
        if (e.target.value.length > 1){
            if (e.key === 'Enter'){
                let oldChecklist = checklist
                oldChecklist +=(`${e.target.value},`)
                setChecklist(oldChecklist)
                e.currentTarget.value = ""
            }
        }
    }
    
    const handleCheckDelete = (item)=>{
        let oldChecklist = checklist.split(",")
        oldChecklist.splice(oldChecklist.indexOf(item),1)
        setChecklist(oldChecklist.join(","))
    }
    
    const handleSave = () =>{
        dispatch(updateDaily({
            "id":daily.id,
            "title": title,
            "notes":notes,
            "difficulty":difficulty,
            "duration":duration,
            "tags":tags,
            "start_date":`${new Date(startDate).toISOString().slice(0, 10)}`,
            "days":dailyDays,
            "checklist":checklist,
            "completed":daily.completed,
        }))
        closeModal()
    }
    
    useEffect(()=>{
        if(daily.days.length)setIsLoaded(true)
    },[daily])
    const dailyId = daily.id
// console.log(daysChecklist.split('"'), '---------')
// console.log(checklist)
    return (<>
        {isLoaded && <div className="habitModalBox">
        <div >

            <div className="buttonDiv"  >
                <div className="submitHabitButton" onClick={handleCancel}>Cancel</div>
                <div className="submitHabitButton" onClick={handleSave}>Save</div>
            </div>
            <h3 >Edit Daily</h3>
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
        {/* {listItems.forEach(ele=>{
            <div key={ele.length}>
                {ele}
            </div>
        })} */}
        {listItems.map(item=>(
                <div>
                <input type = "checkbox"/>
                {item}
                <button class="fa-regular fa-trash-can" style={{border:0}} value={item} onClick={(e)=>{e.preventDefault(),handleCheckDelete(item)}}></button>
                </div>
                ))}
        </>
        <input
            type="text"
            onKeyDown={handleChecklist}
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
            defaultValue={tags}
            onChange={(e)=>setTags(e.target.value)}
        ></input>
        </div>
        <div className="buttonDiv">
        <button class="fa-regular fa-trash-can" onClick={handleDelete}>Delete this Daily</button>
    </div></div>
    }
    </>)
    // return(
    //     <div>hello</div>
    // )
}
export default DailyModal
