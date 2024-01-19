import { csrfFetch } from "./csrf"

const LOAD_Habits= 'habits/loadHabits'

export const loadHabits=(habits)=>({
    type:LOAD_Habits,
    habits
})

export const getAllHabits = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/habits/${userId}`)
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadHabits(data))
        return data
    }
    return res
}

const habitReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_Habits:
            newState = {}
            // console.log(action.habits, '-----store')
            if(action.habits.habits && action.habits.habits !== undefined){
                action.habits.habits.forEach(ele => {

                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default habitReducer
