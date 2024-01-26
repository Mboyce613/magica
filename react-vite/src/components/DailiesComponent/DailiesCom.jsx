import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDailies, addDaily } from "../../redux/daily";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DailyModal from "../DailyModal/dailyModal";
import "./dailies.css"

function DailiesComponent (){
    const [isLoaded, setIsLoaded] = useState(false)
    const [dailyTitle, setDailyTitle] = useState('')
    const [currErrors, setCurrErrors ] = useState({})
    const sessionUser = useSelector(state => state.session.user)
    const dailies = useSelector(state => state.dailies)
    const dispatch = useDispatch()

    const handleEnter = (e)=>{
        if(e.key === "Enter"){
            if(!dailyTitle.length){
                return null
            }else{
                dispatch(addDaily({
                    "user_id":sessionUser.id,
                    "title":dailyTitle,
                    "notes":"",
                    "difficulty":1,
                    "duration":1,
                    "tags":"",
                    "start_date":`${new Date().toISOString().slice(0, 10)}`,
                    "days":"Sun Mon Tue Wed Thu Fri Sat",
                    "checklist":"",
                    "streak":0,
                    "completed":"False"
                }))
                setDailyTitle('')
                dispatch(getAllDailies(sessionUser.id))
            }
        }
    }

    useEffect(()=>{
        dispatch(getAllDailies(sessionUser.id))
          .then(()=>{
            setIsLoaded(true)
          })
    },[isLoaded])
    return (
        <>
        <div
        className="habitBox"
        >
        <section>
            <div>
                <div style={{fontSize:25,padding:5,backgroundColor:"orange"}}>Dailies</div>
            </div>
            <div>
                <input
                    type='text'
                    value={dailyTitle}
                    placeholder="Add a Daily"
                    onChange={(e)=> setDailyTitle(e.target.value)}
                    onKeyDown={handleEnter}
                    className="newHabit"
                />
                <div className="toDoNav">
                    {Object.values(dailies).map(daily =>{
                        // console.log(daily)
                        let tempDaily = {
                            "id":daily.id,
                            "user_id":daily.user_id,
                            "title": daily.title,
                            "notes": daily.notes,
                            "difficulty":daily.difficulty,
                            "duration":daily.duration,
                            "tags":daily.tags,
                            "start_date":daily.start_date,
                            "days":daily.checklist,
                            "checklist":daily.checklist,
                            "streak":daily.streak,
                            "completed":daily.completed
                        }
                        return <div key={daily.id}>
                            <div className="DailyCheckboxDiv" >
                                <input type="checkbox"/>

                            <OpenModalButton
                            buttonText={daily.title}
                            modalComponent={<DailyModal daily={daily}/>}
                            buttonClass={"habitModalButton"}
                            /></div>
                        </div>
                    })}
                </div>
            </div>

        </section></div>
        </>
    )
}
export default DailiesComponent
