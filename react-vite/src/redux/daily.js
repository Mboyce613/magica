import { csrfFetch } from "./csrf"

const LOAD_DAILIES= 'dailies/loadDailies'
const RECIEVE_DAILY = 'daily/recieveDaily'
const EDIT_DAILY = 'daily/editDaily'
const REMOVE_DAILY = 'daily/removeDaily'

export const loadDailies=(dailies)=>({
    type:LOAD_DAILIES,
    dailies
})

export const recieveDaily = (daily)=>({
    type:RECIEVE_DAILY,
    daily
})

export const editDaily = (daily)=>({
    type:EDIT_DAILY,
    daily
})

export const removeDaily = (daily)=>({
    type:REMOVE_DAILY,
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

export const updateDaily = (daily) => async (dispatch) =>{
    const res = await csrfFetch(`/api/dailies/${daily.id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(daily)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(editDaily(daily))
        return data
    }
    return res
}

export const deleteDaily = (daily) => async (dispatch)=>{
    const res = await csrfFetch(`/api/dailies/${daily.id}`,{
        method:'DELETE'
    })
    if(res.ok){
        const data = await res.json()
        dispatch(editDaily(daily))
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
        case EDIT_DAILY:
            return {...state, [action.daily.id]:action.daily}
        case REMOVE_DAILY:
            newState={...state}
            delete newState[action.daily.id]
            return newState
        default : return state
    }
}

export default dailyReducer