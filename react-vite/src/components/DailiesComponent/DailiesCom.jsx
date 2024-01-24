import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDailies, addDaily } from "../../redux/daily";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DailyModal from "../DailyModal/dailyModal";

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
                })).then((res)=>setDailyTitle(''))
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
        <section>
            <div>
                <div>Dailies</div>
            </div>
            <div>
                <input
                    type='text'
                    value={dailyTitle}
                    placeholder="Add a Daily"
                    onChange={(e)=> setDailyTitle(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <div>
                    {Object.values(dailies).map(daily =>{
                        // console.log(daily)
                        return <div key={daily.id}>
                            <div>
                                <input type="checkbox"/>
                            </div>
                            <OpenModalButton 
                            buttonText={daily.title}
                            modalComponent={<DailyModal daily={daily}/>}
                            buttonClass={"habitModalButton"}
                            />
                        </div>
                    })}
                </div>
            </div>

        </section>
    )
}
export default DailiesComponent