// import { csrfFetch } from "./csrf"

const LOAD_TO_DOS= 'toDos/loadToDos'

export const loadToDos=(toDos)=>({
    type:LOAD_TO_DOS,
    toDos
})

export const getAllToDos = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/to_dos/${userId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(loadToDos(data))
        return data
    }
    return res
}

const toDoReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_TO_DOS:
            newState = {}
            if(action.toDos.to_dos && action.toDos.to_dos !== undefined){
                action.toDos.to_dos.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default toDoReducer
