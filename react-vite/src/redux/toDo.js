// import { csrfFetch } from "./csrf"

const LOAD_TO_DOS = "toDos/loadToDos";
const UPDATE_TODO = "toDos/UPDATE_HABIT";
const DELETE_Todo = "toDos/DELETE";
const CREATE_Todo = "toDos/CREATE";

export const loadToDos = (toDos) => ({
  type: LOAD_TO_DOS,
  toDos,
});

export const updateToDo = (toDo) => ({
  type: UPDATE_TODO,
  toDo,
});

export const deleteHabit = (toDo) => ({
  type: DELETE_Todo,
  toDo,
});

export const createHabit = (toDo) => ({
  type: CREATE_Todo,
  toDo,
});

export const updateToDoMaker = (toDo, toDoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/to_do/${toDoId}`, {
    method: "PUT",
    body: JSON.stringify(toDo),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateHabit(toDo));
    return data;
  } else {
    throw res;
  }
};
export const getAllToDos = (userId) => async (dispatch) => {
  const res = await fetch(`/api/to_dos/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadToDos(data));
    return data;
  }
  return res;
};

const toDoReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_TO_DOS:
      newState = {};
      if (action.toDos.to_dos && action.toDos.to_dos !== undefined) {
        action.toDos.to_dos.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;
      case UPDATE_TODO: {
        const  toDo = { ...state };
        habits[action.toDo.id] = action.toDo;
        return { ...toDo };
      }
    default:
      return state;
  }

};

export default toDoReducer;
