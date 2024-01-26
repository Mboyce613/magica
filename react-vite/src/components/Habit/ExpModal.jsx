
const ExpModal = (sessionUser) =>{
    const user = sessionUser.sessionUser
    console.log("from exp modal",user)
    return (
        <div className="ExpModalDiv">

            <div class="fa-regular fa-heart fa-bounce"></div>
            <div>
            <h1>Congrats {user.firstname}!!!</h1>
            <h1>Habit Completed.</h1>
            <h1> New Exp Total {user.exp}</h1>
            <h1>Keep up the Good Work!</h1>
            </div>
        </div>
    )
}

export default ExpModal
