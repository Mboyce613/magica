import { csrfFetch } from "./csrf"

const LOAD_AVATARS= 'avatar/loadAvatars'
const GET_AVATAR= 'avatar/getAvatar'
const UPDATE_AVATAR= 'avatar/updateAvatar'
const DELETE_AVATAR = 'avatar/deleteAvatar'

export const loadAvatars =(avatars)=>({
    type:LOAD_AVATARS,
    avatars
})

export const getAvatar =(avatar)=>({
    type:GET_AVATAR,
    avatar
})

export const updateAvatar =(payload)=>({
    type:UPDATE_AVATAR,
    payload
})

export const deleteAvatar =(avatar)=>({
    type:DELETE_AVATAR,
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

export const updateAvatarById = (payload,userId) => async (dispatch)=>{
    // backgroundId = payload.backgroundId
    const res = await csrfFetch(`/api/avatars/${userId}`,{
        method: "PUT",
        body: JSON.stringify(payload)
      })
    // console.log(res, '----------')
    if(res.ok){
        // const data = await res.json()
        // dispatch(getAvatar([data]))
        // return data
        // console.log("PAYLOAD!!!", payload)
        dispatch(updateAvatar(payload))
        // console.log("GOT OK FROM PATCH REQUEST")
    }
    return res
}

export const deleteAvatarById = (avatar) => async (dispatch)=>{
    const res = await csrfFetch(`/api/avatars/${avatar}`,{
        method: "DELETE"
    })
    if(res.ok){
        dispatch(deleteAvatar(avatar))
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
                    newState = ele
                })
            }else{
                newState = null
            }
            return newState

        case UPDATE_AVATAR:
            newState = {...state}
            // console.log("ACTION", action, 'line 56')
            // console.log(action.avatar, '-----store')
            if(action.payload && action.payload !== undefined){
                // console.log('I GOT HERE', newState)
                // console.log("ACTION", action)
                newState.backgroundId = action.payload.backgroundId
                newState.hairId = action.payload.hairId
                newState.faceId = action.payload.faceId
                newState.bodyId = action.payload.bodyId
            }else{
                newState = null
            }
            return {...newState}

        case DELETE_AVATAR:
            newState = {...state}
            // console.log("ACTION", action, 'line 56')
            // console.log(action.avatar, '-----store')
            newState.avatars.backgroundId = 1
            newState.avatars.bodyId = 1
            newState.avatars.faceId = 1
            newState.avatars.hairId = 1
            return newState

        default:return state
    }
}

export default avatarReducer