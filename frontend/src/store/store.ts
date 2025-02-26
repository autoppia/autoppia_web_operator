import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { socketReducer } from "./reducer";

const store = createStore(socketReducer, applyMiddleware(thunk));

export default store;
