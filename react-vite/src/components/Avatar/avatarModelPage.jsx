import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBackgrounds } from "../../redux/backround";
import { getAllHairs } from "../../redux/hair";
import { getAllFaces } from "../../redux/face";
import { getAllBodies } from "../../redux/body";
import { updateAvatarBackgroundById } from "../../redux/avatar";
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

const AvatarModalPage = (userId) =>{

    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const backgrounds = useSelector((state)=>state.backgrounds)
    const body = useSelector((state)=>state.bodies)
    const face = useSelector((state)=>state.faces)
    const hair = useSelector((state)=>state.hairs)

    useEffect(()=>{
        dispatch(getAllBackgrounds())
        dispatch(getAllHairs())
        dispatch(getAllFaces())
        dispatch(getAllBodies())
          .then(()=>{
            setIsLoaded(true)
          })
    },[])

    const handleChangeBackgroundRed = async()=>{
      const payload = {
        userId: userId.userId,
        backgroundId: 1
      }
      dispatch(updateAvatarBackgroundById(payload, userId.userId))
    }

    const handleChangeBackgroundBlue = async()=>{
      const payload = {
        userId: userId.userId,
        backgroundId: 2
      }
      dispatch(updateAvatarBackgroundById(payload, userId.userId))
    }

    const handleChangeBackgroundGreen = async()=>{
      const payload = {
        userId: userId.userId,
        backgroundId: 3
      }
      dispatch(updateAvatarBackgroundById(payload, userId.userId))
    }


    return (
        <>
        <div>Hello from AvatarModalPage</div>
        {backgrounds[1] &&<img src={Background_Red} onClick={()=>{handleChangeBackgroundRed()}}/>}
        {backgrounds[2] &&<img src={Background_Blue} onClick={()=>{handleChangeBackgroundBlue()}}/>}
        {backgrounds[3] &&<img src={Background_Green} onClick={()=>{handleChangeBackgroundGreen()}}/>}
        <div></div>
        {hair[1] &&<img src={Hat_Red}/>}
        {hair[2] &&<img src={Hat_Blue}/>}
        {hair[3] &&<img src={Hat_Green}/>}
        <div></div>
        {face[1] &&<img src={Face1}/>}
        {face[2] &&<img src={Face2}/>}
        {face[3] &&<img src={Face3}/>}
        <div></div>
        {body[1] &&<img src={BodyRed}/>}
        {body[2] &&<img src={BodyBlue}/>}
        {body[3] &&<img src={BodyGreen}/>}
        </>
    )
}


export default AvatarModalPage
