import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBackgrounds } from "../../redux/backround";
import { getAllHairs } from "../../redux/hair";
import { getAllFaces } from "../../redux/face";
import { getAllBodies } from "../../redux/body";
import { updateAvatarById } from "../../redux/avatar";
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
import { useModal } from "../../context/Modal";
import './avatar.css'

const AvatarModalPage = (userId) =>{

    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatar = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    const body = useSelector((state)=>state.bodies)
    const face = useSelector((state)=>state.faces)
    const hair = useSelector((state)=>state.hairs)
    const [avatarBackground, setAvatarBackground] = useState(avatar.backgroundId)
    const [avatarHair, setAvatarHair] = useState(avatar.hairId)
    const [avatarFace, setAvatarFace] = useState(avatar.faceId)
    const [avatarBody, setAvatarBody] = useState(avatar.bodyId)
    const {closeModal} = useModal()

    useEffect(()=>{
        dispatch(getAllBackgrounds())
        dispatch(getAllHairs())
        dispatch(getAllFaces())
        dispatch(getAllBodies())
          .then(()=>{
            setIsLoaded(true)
          })
    },[])

    // const handleChangeBackgroundRed = async()=>{
    //   const payload = {
    //     userId: userId.userId,
    //     backgroundId: 1
    //   }
    //   dispatch(updateAvatarById(payload, userId.userId))
    // }

    const handleChangeBackgroundRed = async()=>{
      setAvatarBackground(1)
    }

    const handleChangeBackgroundBlue = async()=>{
      setAvatarBackground(2)
    }

    const handleChangeBackgroundGreen = async()=>{
      setAvatarBackground(3)
    }

    const handleChangeHairRed = async()=>{
      setAvatarHair(1)
    }

    const handleChangeHairBlue = async()=>{
      setAvatarHair(2)
    }

    const handleChangeHairGreen = async()=>{
      setAvatarHair(3)
    }

    const handleChangeFace1 = async()=>{
      setAvatarFace(1)
    }

    const handleChangeFace2 = async()=>{
      setAvatarFace(2)
    }

    const handleChangeFace3 = async()=>{
      setAvatarFace(3)
    }

    const handleChangeBodyRed = async()=>{
      setAvatarBody(1)
    }

    const handleChangeBodyBlue = async()=>{
      setAvatarBody(2)
    }

    const handleChangeBodyGreen = async()=>{
      setAvatarBody(3)
    }

    const handleSubmit = async()=>{
        const payload = {
        userId: userId.userId,
        backgroundId: avatarBackground,
        hairId: avatarHair,
        faceId: avatarFace,
        bodyId: avatarBody
      }
      // console.log(payload)
      dispatch(updateAvatarById(payload, userId.userId))
      closeModal()
    }


    return (
        <>
        <div className="avatarModalDiv">
        <section className="updateAvatarBackground">
        <div className=' editAvatar '>Edit your Avatar</div>
        <section className="createAvatarOptions">
        <section className="createAvatarRow">
        <text className='updatebg modelselect createAvatarChoices createAvatarChoicesBackgrounds'>Choose your back ground</text>
        {backgrounds[1] &&<img src={Background_Red} className="modelselect createAvatarChoices createAvatarChoicesBackgrounds" onClick={()=>{handleChangeBackgroundRed()}}/>}
        {backgrounds[2] &&<img src={Background_Blue} className="modelselect createAvatarChoices createAvatarChoicesBackgrounds" onClick={()=>{handleChangeBackgroundBlue()}}/>}
        {backgrounds[3] &&<img src={Background_Green} className="modelselect createAvatarChoices createAvatarChoicesBackgrounds" onClick={()=>{handleChangeBackgroundGreen()}}/>}
        </section>
        <div></div>
        <section className="createAvatarRow">
        <div className='updatebg modelselect createAvatarChoices createAvatarChoicesBackgrounds'>Choose your Hair or Hat</div>
        {hair[1] &&<img src={Hat_Red} className="modelselect createAvatarChoices" onClick={()=>{handleChangeHairRed()}}/>}
        {hair[2] &&<img src={Hat_Blue} className="modelselect createAvatarChoices" onClick={()=>{handleChangeHairBlue()}}/>}
        {hair[3] &&<img src={Hat_Green} className="modelselect createAvatarChoices" onClick={()=>{handleChangeHairGreen()}}/>}
        </section>
        <div></div>
        <section className="createAvatarRow">
        <div className='updatebg modelselect createAvatarChoices createAvatarChoicesBackgrounds'>Choose your Face</div>
        {face[1] &&<img src={Face1} className="modelselect createAvatarChoices" onClick={()=>{handleChangeFace1()}}/>}
        {face[2] &&<img src={Face2} className="modelselect createAvatarChoices" onClick={()=>{handleChangeFace2()}}/>}
        {face[3] &&<img src={Face3} className="modelselect createAvatarChoices" onClick={()=>{handleChangeFace3()}}/>}
        </section>
        <div></div>
        <section className="createAvatarRow">
        <div className='updatebg modelselect createAvatarChoices createAvatarChoicesBackgrounds'>Choose your Body</div>
        {body[1] &&<img src={BodyRed} className="modelselect createAvatarChoices" onClick={()=>{handleChangeBodyRed()}}/>}
        {body[2] &&<img src={BodyBlue} className="modelselect createAvatarChoices" onClick={()=>{handleChangeBodyBlue()}}/>}
        {body[3] &&<img src={BodyGreen} className="modelselect createAvatarChoices" onClick={()=>{handleChangeBodyGreen()}}/>}
        </section>
        <div></div>
        </section>
        <button className='splashbutton' onClick={()=>{handleSubmit()}}>Save</button>
        </section> </div>
        </>
    )
}


export default AvatarModalPage
