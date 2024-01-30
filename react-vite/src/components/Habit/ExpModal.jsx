import { useModal } from "../../context/Modal"
const ExpModal = (sessionUser) =>{
    const {closeModal} = useModal()
    const user = sessionUser.sessionUser
    // console.log("from exp modal",user)
    return (
        <div className="ExpModalDiv">

            <div class="fa-regular fa-heart fa-bounce"></div>
            <div>
            <h1>Congrats {user.firstname}!!!</h1>
            <h1>Habit Completed.</h1>
            <h1>Exp Total: {user.exp}</h1>
            <h1>Keep up the Good Work!</h1>
            <button
            className="submitHabitButton"
            onClick={()=>closeModal()}
            >Close</button>
            </div>
        </div>
    )
}

export default ExpModal
