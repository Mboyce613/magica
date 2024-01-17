import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";

function Avatar({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    console.log(avatars)
    useEffect(()=>{
        dispatch()
          .then(()=>{
            setIsLoaded(true)
          }
            )
    },[avatars, backgrounds, isLoaded])
    return (

      <>
        <div>hello</div>
        <div>Avatar Component</div>
        {userId}
        <div>Habit Component</div>
        <div>Daily Component</div>
        <div>To Do Component</div>
      </>

    )
}




export default Avatar;