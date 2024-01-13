import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { useState } from "react";


function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  
  return (
    <section>
    {sessionUser ? <div>

      <div>
      <NavLink to="/">Home</NavLink>
      </div>
      
      <div>
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
  );
}

export default Navigation;
