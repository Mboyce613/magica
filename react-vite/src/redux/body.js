// import { csrfFetch } from "./csrf"

const LOAD_BODIES= 'bodies/loadBodies'

export const loadBodies=(bodies)=>({
    type:LOAD_BODIES,
    bodies
})

export const getAllBodies = () => async (dispatch)=>{
    const res = await fetch('/api/bodies')
    console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadBodies(data))
        return data
    }
    return res
}

const bodyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_BODIES:
            newState = {}
            console.log(action.bodies, '-----store')
            if(action.bodies && action.bodies !== undefined){
                // action.bodies.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default bodyReducer