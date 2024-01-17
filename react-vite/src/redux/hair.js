// import { csrfFetch } from "./csrf"

const LOAD_HAIRS= 'hairs/loadHairs'

export const loadHairs=(hairs)=>({
    type:LOAD_HAIRS,
    hairs
})

export const getAllHairs = () => async (dispatch)=>{
    const res = await fetch('/api/hairs')
    console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadHairs(data))
        return data
    }
    return res
}

const hairReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_HAIRS:
            newState = {}
            console.log(action.hairs, '-----store')
            if(action.hairs && action.hairs !== undefined){
                // action.hairs.forEach(ele => {
                    
                //     newState[ele.id] = ele
                // })
            }else{
                newState = null
            }
            return newState
        default:return state
    }
}

export default hairReducer