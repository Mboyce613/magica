// import { csrfFetch } from "./csrf"

const LOAD_AVATARS= 'avatar/loadAvatars'
const GET_AVATAR= 'avatar/getAvatar'

export const loadAvatars =(avatars)=>({
    type:LOAD_AVATARS,
    avatars
})

export const getAvatar =(avatar)=>({
    type:GET_AVATAR,
    avatar
})

export const getAllAvatars = () => async (dispatch)=>{
    const res = await fetch('/api/avatars')
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadAvatars([data]))
        return data
    }
    return res
}

export const getAvatarsById = (avatar) => async (dispatch)=>{
    const res = await fetch(`/api/avatars/${avatar}`)
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(getAvatar([data]))
        return data
    }
    return res
}

const avatarReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_AVATARS:
            newState = {}
            // console.log(action.avatars, '-----store')
            if(action.avatars && action.avatars !== undefined){
                // action.avatars.forEach(ele => {
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        

        case GET_AVATAR:
            newState = {}
            // console.log("ACTION", action, 'line 56')
            // console.log(action.avatar, '-----store')
            if(action.avatar && action.avatar !== undefined){
                action.avatar.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default avatarReducer