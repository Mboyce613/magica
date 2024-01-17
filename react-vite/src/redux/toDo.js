// import { csrfFetch } from "./csrf"

const LOAD_TO_DOS= 'toDos/loadToDos'

export const loadToDos=(toDos)=>({
    type:LOAD_TO_DOS,
    toDos
})

export const getAllToDos = () => async (dispatch)=>{
    const res = await fetch('/api/to_dos')
    console.log(res.text(), '----------')
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
            console.log(action.toDos, '-----store')
            if(action.toDos && action.toDos !== undefined){
                // action.toDos.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default toDoReducer