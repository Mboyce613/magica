import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDailies } from "../../redux/daily";
import DailyComponent from "../DailyComponent/DailyComponent";

function DailiesComponent (){
    const [isLoaded, setIsLoaded] = useState(false)
    const [addDaily, setAddDaily] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const dailies = useSelector(state => state.dailies)
    const dispatch = useDispatch()
    console.log(sessionUser, '-----')

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
                <div>All</div>
                <div>Due</div>
                <div>Not Due</div>
            </div>
            <div>
                <textarea
                    value={addDaily}
                    placeholder="Add a Daily"
                    onChange={(e)=> setAddDaily(e.target.value)}
                />
                <div>
                    {Object.values(dailies).map(daily =>{
                        return <DailyComponent/>
                    })}
                </div>
            </div>

        </section>
    )
}
export default DailiesComponent