const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER_EXP = 'users/updateUserExp'


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const updateUserExp = (user) => ({
  type: UPDATE_USER_EXP,
  payload:user

})

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const updateUsersExp = (exp,userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/exp`, {
    method: "PATCH",
    body: JSON.stringify(exp),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateUserExp(exp));
    return data;
  } else {
    throw res;
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case UPDATE_USER_EXP: {
        const user = { ...state };
        console.log("from user reducer", action)
        user[action.payload.id] = action.user;
        return { ...user };
      }
    default:
      return state;

  }
}

export default sessionReducer;
