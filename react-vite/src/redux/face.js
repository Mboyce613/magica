// import { csrfFetch } from "./csrf"

const LOAD_FACES= 'faces/loadFaces'

export const loadFaces=(faces)=>({
    type:LOAD_FACES,
    faces
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
        default:return state
    }
}

export default faceReducer