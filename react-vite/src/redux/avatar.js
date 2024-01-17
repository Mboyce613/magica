// import { csrfFetch } from "./csrf"

const LOAD_AVATARS= 'avatar/loadAvatars'

export const loadAvatars =(avatars)=>({
    type:LOAD_AVATARS,
    avatars
})

export const getAllAvatars = () => async (dispatch)=>{
    const res = await fetch('/api/avatars')
    console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadAvatars(data))
        return data
    }
    return res
}

const avatarReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_AVATARS:
            newState = {}
            console.log(action.avatars, '-----store')
            if(action.avatars && action.avatars !== undefined){
                action.avatars.forEach(ele => {
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