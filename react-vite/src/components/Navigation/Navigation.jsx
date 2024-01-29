import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { useState } from "react";


function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
    <hr className='solid'/>
    <div >

    <section>
    {sessionUser ? <div className="navFlexBox">
      <div >
        <h1 className="title">Habicka Magicka</h1>
      </div>
      <div>
      <h1 class="fa-solid fa-dragon"></h1>
      </div>

      <div className="Profile" >
      <NavLink to='/home'>Home</NavLink>
      <ProfileButton className="profileButton" />
      </div>

    </ div> :
    <div className="notLoggedIn">
      <div>
      <NavLink to='/'>Home</NavLink>
      </div>
      <div>
        <NavLink to='signup'>Get Started</NavLink>
      </div>
      <div>
        <NavLink to='login'>Log In</NavLink>
      </div>
    </div>

    }

    </section>

  </div>
  <hr className='solid'/>
  </>
  );
}

export default Navigation;
