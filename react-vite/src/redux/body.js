// import { csrfFetch } from "./csrf"

const LOAD_BODIES= 'bodies/loadBodies'
const GET_BODY= 'bodies/getBody'

export const loadBodies=(bodies)=>({
    type:LOAD_BODIES,
    bodies
})

export const getBody =(bodyId)=>({
    type:GET_BODY,
    bodyId
})

export const getAllBodies = () => async (dispatch)=>{
    const res = await fetch('/api/bodies')
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadBodies(data))
        return data
    }
    return res
}

export const getBodyById = (bodyId) => async (dispatch)=>{
    const res = await fetch(`/api/bodies/${bodyId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getBody([data]))
        return data
    }
    return res
}

const bodyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_BODIES:
            newState = {}
            // console.log(action.bodies, '-----store')
            if(action.bodies.bodies && action.bodies.bodies !== undefined){
                action.bodies.forEach(ele => {
                    
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        case GET_BODY:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.bodyId && action.bodyId !== undefined){
                action.bodyId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default bodyReducer