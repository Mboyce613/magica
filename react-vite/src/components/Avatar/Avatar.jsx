import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllBackgrounds } from "../../redux/backround";
import { getAvatarsById } from "../../redux/avatar";
import { getBackgroundById } from "../../redux/backround";
import { getBodyById } from "../../redux/body";
import { getFaceById } from "../../redux/face";
import { getHairById } from "../../redux/hair";
import { useModal } from "../../context/Modal";
import AvatarLink from "./avatarLink";
import AvatarModalPage from "./avatarModelPage";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
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
    const { closeModal } = useModal();
    const avatar = useSelector((state)=>state.avatars)
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
          .then(()=>{
            setIsLoaded(true)
            
          }
            )
    },[])


    return (
      <>
        {/* <div>Hello from Avatar</div> */}
        {/* <p>Background</p> */}
        {/* {backgrounds[1] && <p>{`${backgrounds[1].url}`}</p>} */}
        <section className="avatarSection">
        {<OpenModalButton buttonClass={'avatarOpenModelButton'} modalComponent={<AvatarModalPage userId={userId}/>}/>}
        {backgrounds[avatar.backgroundId] && avatar.backgroundId === 1 &&<img className="avatarBackground" src={Background_Red} />}
        {backgrounds[avatar.backgroundId] && avatar.backgroundId === 2 &&<img className="avatarBackground" src={Background_Blue} />}
        {backgrounds[avatar.backgroundId] && avatar.backgroundId === 3 &&<img className="avatarBackground" src={Background_Green} />}
        {/* <p>Body</p> */}
        {/* {body[1] && <p>{`${body[1].url}`}</p>} */}
        {/* <section className="avatarParts"> */}
        {body[avatar.bodyId] && avatar.bodyId === 1 &&<img className="avatarBody" src={BodyRed}/>}
        {body[avatar.bodyId] && avatar.bodyId === 2 &&<img className="avatarBody" src={BodyBlue}/>}
        {body[avatar.bodyId] && avatar.bodyId === 3 &&<img className="avatarBody" src={BodyGreen}/>}
        {/* <p>Face</p> */}
        {/* {face[1] && <p>{`${face[1].url}`}</p>} */}
        {face[avatar.faceId] && avatar.faceId === 1 &&<img className="avatarFace" src={Face1}/>}
        {face[avatar.faceId] && avatar.faceId === 2 &&<img className="avatarFace" src={Face2}/>}
        {face[avatar.faceId] && avatar.faceId === 3 &&<img className="avatarFace" src={Face3}/>}
        {/* <p>Hair</p> */}
        {/* {hair[1] && <p>{`${hair[1].url}`}</p>} */}
        {hair[avatar.hairId] && avatar.hairId === 1 &&<img className="avatarHair" src={Hat_Red}/>}
        {hair[avatar.hairId] && avatar.hairId === 2 &&<img className="avatarHair" src={Hat_Blue}/>}
        {hair[avatar.hairId] && avatar.hairId === 3 &&<img className="avatarHair" src={Hat_Green}/>}
        </section>
        {/* </section> */}
      </>

    )
} 

export default Avatar;