import { csrfFetch } from "./csrf"

const LOAD_DAILIES= 'dailies/loadDailies'
const RECIEVE_DAILY = 'daily/recieveDaily'

export const loadDailies=(dailies)=>({
    type:LOAD_DAILIES,
    dailies
})

export const recieveDaily = (daily)=>({
    type:RECIEVE_DAILY,
    daily
})

export const getAllDailies = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/dailies/${userId}`)
    if(res.ok){
        const data = await res.json()
        // console.log(data, '------')
        dispatch(loadDailies(data))
        return data
    }
    return res
}

export const addDaily = (daily) => async (dispatch)=>{
    const res = await csrfFetch(`/api/dailies/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(daily)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(recieveDaily(daily))
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
        case RECIEVE_DAILY:
            return {...state, [action.daily.id]:action.daily}
        default:return state
    }
}

export default dailyReducer