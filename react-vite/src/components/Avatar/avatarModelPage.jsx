import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBackgrounds } from "../../redux/backround";
import { getAllHairs } from "../../redux/hair";
import { getAllFaces } from "../../redux/face";
import { getAllBodies } from "../../redux/body";
import Background_Blue from '../../../../app/graphics/Background_Blue.png'
import Background_Green from '../../../../app/graphics/Background_Green.png'
import Background_Red from '../../../../app/graphics/Background_Red.png'

const AvatarModalPage = () =>{

    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const backgrounds = useSelector((state)=>state.backgrounds)

    useEffect(()=>{
        dispatch(getAllBackgrounds())
        dispatch(getAllHairs())
        dispatch(getAllFaces())
        dispatch(getAllBodies())
          .then(()=>{
            setIsLoaded(true)
          })
    },[])


    return (
        <>
        <div>Hello from AvatarModalPage</div>
        {backgrounds[1] && backgrounds[1].id === 1 &&<img src={Background_Red} />}
        {backgrounds[2] && backgrounds[2].id === 2 &&<img src={Background_Blue} />}
        {backgrounds[3] && backgrounds[3].id === 3 &&<img src={Background_Green} />}
        </>
    )
}


export default AvatarModalPage
