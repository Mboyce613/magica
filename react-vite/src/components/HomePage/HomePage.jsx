import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllAvatars } from "../../redux/avatar";
import { thunkSignup } from "../../redux/session";
import { getAllBackgrounds } from "../../redux/backround";
import Avatar from "../Avatar/Avatar";
import Habit from "../Habit/habit"


function HomePage(){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    console.log("SESSION USER ID", sessionUser.id)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    console.log(avatars)
    useEffect(()=>{
        dispatch(getAllAvatars())
          .then(()=>{
            setIsLoaded(true)
          }
            )
    },[avatars, backgrounds, isLoaded])
    return (

      <>
        <div>Avatar Component</div>
        <Avatar userId = {sessionUser.id}/>
        <div>Habit Component</div>
        <Habit userId = {sessionUser.id}/>
        <div>Daily Component</div>
        <div>To Do Component</div>
      </>

    )
}
export default HomePage;