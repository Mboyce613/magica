import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";
import { getAvatarsById } from "../../redux/avatar";
import { getBackgroundById } from "../../redux/backround";
import { getBodyById } from "../../redux/body";
import { getFaceById } from "../../redux/face";
import { getHairById } from "../../redux/hair";
import Background_Blue from '../../../../app/graphics/Background_Blue.png'
import Background_Green from '../../../../app/graphics/Background_Green.png'
import Background_Red from '../../../../app/graphics/Background_Red.png'
import BodyRed from '../../../../app/graphics/BodyRed.png'
import BodyBlue from '../../../../app/graphics/BodyBlue.png'
import BodyGreen from '../../../../app/graphics/BodyGreen.png'
import Face1 from '../../../../app/graphics/Face1.png'
import Face2 from '../../../../app/graphics/Face2.png'
import Face3 from '../../../../app/graphics/Face3.png'
import Hat_Red from '../../../../app/graphics/Hat_Red.png'
import Hat_Blue from '../../../../app/graphics/Hat_Blue.png'
import Hat_Green from '../../../../app/graphics/Hat_Green.png'

function Hairs({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const hair = useSelector((state)=>state.hairs)

    // console.log('BACKGROUND LOG 16', backgrounds[1])
    // console.log("Avatar line 13",avatars)
    useEffect(()=>{
        dispatch(getAvatarsById(userId))
          .then((data)=>{
            dispatch(getHairById(data.hairId))
          })
          .then(()=>{
            setIsLoaded(true)
            
          }
            )
    },[])

    for(h in hair){

    }

    return (
      <>
        <div>Hello from Hairs</div>
        {hair[1] && hair[1].id === 1 &&<img src={Hat_Red}/>}
        {hair[1] && hair[1].id === 2 &&<img src={Hat_Blue}/>}
        {hair[1] && hair[1].id === 3 &&<img src={Hat_Green}/>}

      </>

    )
} 

export default Hairs;