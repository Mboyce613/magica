// import { csrfFetch } from "./csrf"

const LOAD_BACKGROUNDS= 'backgrounds/loadBackgrounds'
const GET_BACKGROUND= 'backgrounds/getBackground'


export const loadBackgrounds=(backgrounds)=>({
    type:LOAD_BACKGROUNDS,
    backgrounds
})

export const getBackground =(backgroundId)=>({
    type:GET_BACKGROUND,
    backgroundId
})


export const getAllBackgrounds = () => async (dispatch)=>{
    const res = await fetch('/api/backgrounds')
    if(res.ok){
        const data = await res.json()
        dispatch(loadBackgrounds(data))
        return data
    }
    return res
}

export const getBackgroundById = (backgroundId) => async (dispatch)=>{
    const res = await fetch(`/api/backgrounds/${backgroundId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getBackground([data]))
        return data
    }
    return res
}

const backgroundReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_BACKGROUNDS:
            newState = {}
            // console.log(action.backgrounds, '-----store')
            if(action.backgrounds && action.backgrounds !== undefined){
                // console.log("ACTION.BACKGROUNDS LINE 43", action.backgrounds)
                action.backgrounds.backgrounds.forEach(ele => {
                    
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState
        
        case GET_BACKGROUND:
            newState = {}
            // console.log("ACTION", action, 'line 54')
            // console.log(action.backgroundId, '-----store')
            if(action.backgroundId && action.backgroundId !== undefined){
                action.backgroundId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default backgroundReducer