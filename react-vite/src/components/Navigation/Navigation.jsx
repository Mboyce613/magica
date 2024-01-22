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
    <div className="navFlexBox">

    <section>
    {sessionUser ? <div>
      <div className="title">
        <h1>Habicka Magicka</h1>
      </div>
      <div>
      <NavLink to="/">Home</NavLink>
      </div>

      <div className="profileButton">
      <ProfileButton />
      </div>

    </ div> :
    <div>
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
