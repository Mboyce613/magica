// import { csrfFetch } from "./csrf"
import { csrfFetch } from "./csrf";

const LOAD_TO_DOS = "toDos/loadToDos";
const UPDATE_TODO = "toDos/UPDATE_HABIT";
const DELETE_ToDo = "toDos/DELETE";
const CREATE_ToDo = "toDos/CREATE";

export const loadToDos = (toDos) => ({
  type: LOAD_TO_DOS,
  toDos,
});

export const updateToDo = (toDo) => ({
  type: UPDATE_TODO,
  toDo,
});

export const deleteToDo = (toDo) => ({
  type: DELETE_ToDo,
  toDo,
});

export const createToDo = (toDo) => ({
  type: CREATE_ToDo,
  toDo,
});

export const updateToDoMaker = (toDo, toDoId) => async (dispatch) => {
  const res = await fetch(`/api/to_dos/${toDoId}`, {
    method: "PUT",
    body: JSON.stringify(toDo),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateToDo(toDo));
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
export const createToDoMaker = (toDo) => async (dispatch) => {
  const res = await fetch(`/api/to_dos`, {
    method: "POST",
    body: JSON.stringify(toDo),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(createToDo(toDo));
    return data;
  } else {
    throw res;
  }
};

export const toDoDeleteFetch = (toDoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/to_dos/${toDoId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  res.data = data;
  if (res.ok) {
    dispatch(deleteToDo(data));
  } else {
    throw res;
  }
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
      case CREATE_ToDo: {
        const todos = { ...state };
        todos[action.toDo.id] = action.toDo;
        return { ...todos };
      }
      case UPDATE_TODO: {
        const  toDo = { ...state };
        toDo[action.toDo.id] = action.toDo;
        return { ...toDo };
      }
      case DELETE_ToDo:
      newState = { ...state };
      delete newState[action.toDo.id];
      return { ...newState };

    default:
      return state;
  }

};

export default toDoReducer;
