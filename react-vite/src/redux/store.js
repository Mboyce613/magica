import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import avatarReducer from "./avatar";
import backgroundReducer from "./backround";
import bodyReducer from "./body";
import dailyReducer from "./daily";
import faceReducer from "./face";
import habitReducer from "./habit";
import hairReducer from "./hair";
import toDoReducer from "./toDo";

const rootReducer = combineReducers({
  session: sessionReducer,
  avatars: avatarReducer,
  backgrounds:backgroundReducer,
  bodies:bodyReducer,
  faces:faceReducer,
  dailies:dailyReducer,
  habits:habitReducer,
  hairs:hairReducer,
  toDos:toDoReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
