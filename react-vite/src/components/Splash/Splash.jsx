import Navigation from "../Navigation/Navigation"
import { Navigate, useNavigate } from "react-router-dom";
import splashAvatar from "../../../../app/graphics/splashAvatar.png"
import splashHabit from "../../../../app/graphics/splashHabit.png"
import todo from "../../../../app/graphics/todo.png"
import "./Splash.css"

const Splash = () => {
    const navigate = useNavigate()
    return (
        <>
        <section className="background">
        <section className="splashPage">

        <div className="splashTitle">Welcome to Habitica Magica!</div>

        <section className="splashSection">
        <div className="splashText">Create an Awesome Avatar!</div>
        <img className="splashImage" src={splashAvatar}/>
        <button className="splashbutton" onClick={()=>{navigate("/signup")}}>Wow Sign me up!</button>
        </section>
        <div></div>

        <section className="splashSection">
        <div className="splashText"> Set Custom Habits!</div>
        <img className="splashImage" src={splashHabit}/>
        <button className="splashbutton" onClick={()=>{navigate("/signup")}}>I Cant Wait! Sign me up!</button>
        </section>
        <div></div>

        <section className="splashSection">
        <div className="splashText">Make a To Do List!</div>
        <img className="splashImage" src={todo}/>
        <button className="splashbutton" onClick={()=>{navigate("/signup")}}> "Yay...My Favorite...Sign me up!</button>
        <div></div>
        </section>
        </section>
        </section>
        </>
    )
}

export default Splash
