import { csrfFetch } from "./csrf"

const LOAD_Habits='habits/loadHabits'
const UPDATE_Habit='habits/UPDATE_HABIT'

export const loadHabits=(habits)=>({
    type:LOAD_Habits,
    habits
})

export const updateHabit=(habit)=>({
    type:UPDATE_Habit,
    habit
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
export const updateHabitMaker = (habit,habitId)=>async(dispatch)=>{
    const res= await csrfFetch(`/api/habits/${habitId}`,{
      method: "PUT",
      body: JSON.stringify(habit)
    })
    const data = await res.json()
    if (res.ok) {
      // const groups = await res.json()
      dispatch(updateHabit(habit));
      return data
    } else {
      throw res;
    }
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
        case UPDATE_Habit: {
                const habits = { ...state };
                console.log("from habits reducer", state)
                console.log("from groups reducer, action",action)
                habits[action.habit.id] = action.habit;
            return { ...habits };
              }

        default:return state
    }
}

export default habitReducer
