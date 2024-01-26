const MinusModal = (sessionUser) =>{
    const user = sessionUser.sessionUser
    console.log("from exp modal",user)
    return (
        <div className="ExpModalDiv">

            <div class="fa-solid fa-heart-crack fa-shake"></div>
            <div>
            <h1>Oh No {user.firstname}!!!</h1>
            <h1>Habit Failed.</h1>
            <h1>Don't Give Up!</h1>
            <h1>Better Luck Tomorrow!</h1>
            </div>
        </div>
    )
}

export default MinusModal
