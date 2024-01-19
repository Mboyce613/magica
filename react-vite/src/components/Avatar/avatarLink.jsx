import React from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AvatarModalPage from "./avatarModelPage";


const AvatarLink = (background) =>{


    const handleCompleted = () => {

    }
    const handleNotCompleted = () => {

    }

    console.log("from avatarLink",)
    return (
        <>
        <div>
        <button>Plus</button>
        {/* <div>Hello from Link</div> */}
        <OpenModalButton
        buttonText={""}
        modalComponent={<AvatarModalPage />}
        />
        <button>Minus</button>
        </div>
        </>
    )
}

export default AvatarLink
