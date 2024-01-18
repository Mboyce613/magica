import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";
import { getAvatarsById } from "../../redux/avatar";
import { getBackgroundById } from "../../redux/backround";
import Background_Blue from '../../../../app/graphics/Background_Blue.png'
import Background_Green from '../../../../app/graphics/Background_Green.png'
import Background_Red from '../../../../app/graphics/Background_Red.png'


function Avatar({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    // console.log('BACKGROUND LOG 16', backgrounds[1])
    // console.log("Avatar line 13",avatars)
    useEffect(()=>{
        dispatch(getAvatarsById(userId))
          .then((data)=>{
            dispatch(getBackgroundById(data.backgroundId))
          })
          .then(()=>{
            setIsLoaded(true)
            
          }
            )
    },[ dispatch])
    return (
      <>
        <div>Hello from Avatar</div>
        {backgrounds[1] && <p>{`${backgrounds[1].url}`}</p>}
        {backgrounds[1] && <img src={Background_Blue}/>}
      {console.log('BACKGROUND LOG 16', backgrounds[1])}
      </>

    )
} 




export default Avatar;