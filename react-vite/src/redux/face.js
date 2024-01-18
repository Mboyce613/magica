// import { csrfFetch } from "./csrf"

const LOAD_FACES= 'faces/loadFaces'
const GET_FACE= 'faces/getFace'

export const loadFaces=(faces)=>({
    type:LOAD_FACES,
    faces
})

export const getFace=(faceId)=>({
    type:GET_FACE,
    faceId
})

export const getAllFaces = () => async (dispatch)=>{
    const res = await fetch('/api/faces')
    console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadFaces(data))
        return data
    }
    return res
}

export const getFaceById = (faceId) => async (dispatch)=>{
    const res = await fetch(`/api/faces/${faceId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getFace([data]))
        return data
    }
    return res
}

const faceReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_FACES:
            newState = {}
            console.log(action.faces, '-----store')
            if(action.faces && action.faces !== undefined){
                // action.faces.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState

        case GET_FACE:
            newState = {}
            console.log("ACTION", action, 'line 55')
            console.log(action.faceId, '-----store')
            if(action.faceId && action.faceId !== undefined){
                action.faceId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default faceReducer