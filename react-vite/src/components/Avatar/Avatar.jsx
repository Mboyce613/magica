import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";
import { getAvatarsById } from "../../redux/avatar";


function Avatar({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    console.log("Avatar line 13",avatars)
    useEffect(()=>{
        dispatch(getAvatarsById(userId))
          .then(()=>{
            setIsLoaded(true)
          }
            )
    },[ isLoaded])
    return (

      <>
        <div>Hello from Avatar</div>
        <p>{avatars.backgroundId}</p>
      </>

    )
}




export default Avatar;