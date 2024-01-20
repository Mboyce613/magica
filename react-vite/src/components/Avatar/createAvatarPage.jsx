function createAvatarPage({userId}){

    const sessionUser = useSelector((state) => state.session.user);

    return(
        <>
        <h1>Create Your Avatar!</h1>
        </>
    )
}

export default createAvatarPage;