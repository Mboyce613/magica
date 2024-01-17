// import { csrfFetch } from "./csrf"

const LOAD_BACKGROUNDS= 'backgrounds/loadBackgrounds'

export const loadBackgrounds=(backgrounds)=>({
    type:LOAD_BACKGROUNDS,
    backgrounds
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

const backgroundReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_BACKGROUNDS:
            newState = {}
            console.log(action.backgrounds, '-----store')
            if(action.backgrounds && action.backgrounds !== undefined){
                // action.backgrounds.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default backgroundReducer