// import { csrfFetch } from "./csrf"

const LOAD_DAILIES= 'dailies/loadDailies'

export const loadDailies=(dailies)=>({
    type:LOAD_DAILIES,
    dailies
})

export const getAllDailies = () => async (dispatch)=>{
    const res = await fetch('/api/dailies')
    console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
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
            console.log(action.dailies, '-----store')
            if(action.dailies && action.dailies !== undefined){
                // action.dailies.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default dailyReducer