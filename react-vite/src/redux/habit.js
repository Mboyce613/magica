import { csrfFetch } from "./csrf";

const LOAD_Habits = "habits/loadHabits";
const UPDATE_Habit = "habits/UPDATE_HABIT";
const DELETE_Habit = "habits/DELETE";
const CREATE_Habit = 'habits/CREATE'

export const loadHabits = (habits) => ({
  type: LOAD_Habits,
  habits,
});

export const updateHabit = (habit) => ({
  type: UPDATE_Habit,
  habit,
});

export const deleteHabit = (habit) => ({
  type: DELETE_Habit,
  habit,
});

export const createHabit = (habit) => ({
    type: CREATE_Habit,
    habit,
  });


export const getAllHabits = (userId) => async (dispatch) => {
  const res = await fetch(`/api/habits/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadHabits(data));
    return data;
  }
  return res;
};

export const updateHabitMaker = (habit, habitId) => async (dispatch) => {
  const res = await csrfFetch(`/api/habits/${habitId}`, {
    method: "PUT",
    body: JSON.stringify(habit),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateHabit(habit));
    return data;
  } else {
    throw res;
  }
};

export const createHabitMaker = (habit) => async (dispatch) => {
  const res = await csrfFetch(`/api/habits`, {
    method: "POST",
    body: JSON.stringify(habit),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(createHabit(habit));
    return data;
  } else {
    throw res;
  }
};

export const habitDeleteFetch = (habitId) => async (dispatch) => {
  const res = await csrfFetch(`/api/habits/${habitId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  res.data = data;
  if (res.ok) {
    dispatch(deleteHabit(data));
  } else {
    throw res;
  }
};

const habitReducer = (state = {}, action) => {
  let newState = null
  switch (action.type) {
    case LOAD_Habits:
       newState = {};
      if (action.habits.habits && action.habits.habits !== undefined) {
        action.habits.habits.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;
    case CREATE_Habit: {
      const habits = { ...state };
      habits[action.habit.id] = action.habit;
      return { ...habits };
    }

    case UPDATE_Habit: {
      const habits = { ...state };
      habits[action.habit.id] = action.habit;
      return { ...habits };
    }
    case DELETE_Habit:
      newState = { ...state };
      delete newState[action.habit.id];
      return { ...newState };

    default:
      return state;
  }
};

export default habitReducer;
