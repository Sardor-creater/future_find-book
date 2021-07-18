import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./bookReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	books: bookReducer,

});

export const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(thunk))
);
