import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function HomePage(){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Navigate to='signup' replace={true}/>

    return (

        <div>hello</div>

    )
}
export default HomePage;