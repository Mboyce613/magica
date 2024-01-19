// import { csrfFetch } from "./csrf"

const LOAD_HAIRS= 'hairs/loadHairs'
const GET_HAIR= 'hairs/getHairs'

export const loadHairs=(hairs)=>({
    type:LOAD_HAIRS,
    hairs
})

export const getHair =(hairId)=>({
    type:GET_HAIR,
    hairId
})

export const getAllHairs = () => async (dispatch)=>{
    const res = await fetch('/api/hairs')
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadHairs(data))
        return data
    }
    return res
}

export const getHairById = (hairId) => async (dispatch)=>{
    const res = await fetch(`/api/hairs/${hairId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getHair([data]))
        return data
    }
    return res
}

const hairReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_HAIRS:
            newState = {}
            // console.log(action.hairs, '-----store')
            if(action.hairs && action.hairs !== undefined){
                // action.hairs.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState

        case GET_HAIR:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.hairId && action.hairId !== undefined){
                action.hairId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default hairReducer