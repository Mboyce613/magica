import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllAvatars } from "../../redux/avatar";
import { thunkSignup } from "../../redux/session";
import { getAllBackgrounds } from "../../redux/backround";
import DailiesComponent from "../DailiesComponent/DailiesCom";
import Avatar from "../Avatar/Avatar";
import Habit from "../Habit/habit"
import ToDo from "../ToDo/ToDo";
import "./HomePage.css"

function HomePage(){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    // console.log("SESSION USER ID", sessionUser.id)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    // const avatars = useSelector((state)=>state.avatars)
    // const backgrounds = useSelector((state)=>state.backgrounds)
    // console.log(avatars)
    // useEffect(()=>{
    //     dispatch(getAllAvatars())
    //       .then(()=>{
    //         setIsLoaded(true)
    //       }
    //         )
    // },[avatars, backgrounds, isLoaded])
    return (
      <>
      <div className="mainBox">
      <div className="avatarComponent">
      <Avatar userId = {sessionUser.id}/>
      {/* <hr className='solid'/> */}
      </div>


      <div className="habitComponent">
      <Habit userId = {sessionUser.id}/>
      </div>
      <div className="dailyComponent">
      <DailiesComponent userId = {sessionUser.id}/>
      </div>
      <div className="todoComponent">
        <ToDo userId = {sessionUser.id}/>
      </div>
      </div>
    </>
    )
}
export default HomePage;
