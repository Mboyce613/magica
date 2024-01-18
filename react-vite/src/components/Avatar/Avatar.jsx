import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";
import { getAvatarsById } from "../../redux/avatar";
import { getBackgroundById } from "../../redux/backround";
import { getBodyById } from "../../redux/body";
import Background_Blue from '../../../../app/graphics/Background_Blue.png'
import Background_Green from '../../../../app/graphics/Background_Green.png'
import Background_Red from '../../../../app/graphics/Background_Red.png'
import BodyRed from '../../../../app/graphics/BodyRed.png'
import BodyBlue from '../../../../app/graphics/BodyBlue.png'
import BodyGreen from '../../../../app/graphics/BodyGreen.png'

function Avatar({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    const body = useSelector((state)=>state.bodies)
    // console.log('BACKGROUND LOG 16', backgrounds[1])
    // console.log("Avatar line 13",avatars)
    useEffect(()=>{
        dispatch(getAvatarsById(userId))
          .then((data)=>{
            dispatch(getBackgroundById(data.backgroundId))
            dispatch(getBodyById(data.bodyId))
          })
          // .then((data)=>{
          //   dispatch(getBodyById(data.bodyId))
          // })
          .then(()=>{
            setIsLoaded(true)
            
          }
            )
    },[])

    // useEffect(()=>{
    //   dispatch(getAvatarsById(userId))
    //   .then((data)=>{
    //     dispatch(getBodyById(data.bodyId))
    //   })
    // },[])

    return (
      <>
        <div>Hello from Avatar</div>
        <p>Background</p>
        {backgrounds[1] && <p>{`${backgrounds[1].url}`}</p>}
        {backgrounds[1] && <img src={Background_Blue}/>}
        <p>Body</p>
        {body[1] && <p>{`${body[1].url}`}</p>}
        {body[1] && <img src={BodyBlue}/>}

      </>

    )
} 




export default Avatar;