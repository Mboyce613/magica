// import { csrfFetch } from "./csrf"

const LOAD_DAILIES= 'dailies/loadDailies'

export const loadDailies=(dailies)=>({
    type:LOAD_DAILIES,
    dailies
})

export const getAllDailies = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/dailies/${userId}`)
    if(res.ok){
        const data = await res.json()
        console.log(data, '------')
        dispatch(loadDailies(data))
        return data
    }
    return res
}

const dailyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_DAILIES:
            newState = {}
            if(action.dailies.daily && action.dailies.daily !== undefined){
                action.dailies.daily.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default dailyReducer