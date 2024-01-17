import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllAvatars } from "../../redux/avatar";
import { thunkSignup } from "../../redux/session";
import { getAllBackgrounds } from "../../redux/backround";

function HomePage(){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const avatars = useSelector((state)=>state.avatars)
    const backgrounds = useSelector((state)=>state.backgrounds)
    console.log(avatars)
    useEffect(()=>{
        dispatch(getAllAvatars())
          .then(()=>{
            setIsLoaded(true)
          }
            )
    },[avatars, backgrounds, isLoaded])
    return (

        <div>hello</div>

    )
}
export default HomePage;