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

function Avatar({userId}){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    const body = useSelector((state)=>state.bodies)
    const face = useSelector((state)=>state.faces)
    const hair = useSelector((state)=>state.hairs)

    // console.log('BACKGROUND LOG 16', backgrounds[1])
    // console.log("Avatar line 13",avatars)
    useEffect(()=>{
        dispatch(getAvatarsById(userId))
          .then((data)=>{
            dispatch(getBackgroundById(data.backgroundId))
            dispatch(getBodyById(data.bodyId))
            dispatch(getFaceById(data.faceId))
            dispatch(getHairById(data.hairId))
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
        {/* <p>Background</p> */}
        {/* {backgrounds[1] && <p>{`${backgrounds[1].url}`}</p>} */}
        {backgrounds[1] && backgrounds[1].id === 1 &&<img src={Background_Red}/>}
        {backgrounds[1] && backgrounds[1].id === 2 &&<img src={Background_Blue}/>}
        {backgrounds[1] && backgrounds[1].id === 3 &&<img src={Background_Green}/>}
        {/* <p>Body</p> */}
        {/* {body[1] && <p>{`${body[1].url}`}</p>} */}
        {body[1] && body[1].id === 1 &&<img src={BodyRed}/>}
        {body[2] && body[2].id === 2 &&<img src={BodyBlue}/>}
        {body[3] && body[3].id === 3 &&<img src={BodyGreen}/>}
        {/* <p>Face</p> */}
        {/* {face[1] && <p>{`${face[1].url}`}</p>} */}
        {face[1] && face[1].id === 1 &&<img src={Face1}/>}
        {face[2] && face[2].id === 2 &&<img src={Face2}/>}
        {face[3] && face[3].id === 3 &&<img src={Face3}/>}
        {/* <p>Hair</p> */}
        {/* {hair[1] && <p>{`${hair[1].url}`}</p>} */}
        {hair[1] && hair[1].id === 1 &&<img src={Hat_Red}/>}
        {hair[2] && hair[2].id === 2 &&<img src={Hat_Blue}/>}
        {hair[3] && hair[3].id === 3 &&<img src={Hat_Green}/>}

      </>

    )
} 

export default Avatar;