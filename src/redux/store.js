import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import diary from './reducers/diaryReducer';
import file from './reducers/fileReducer';


// Combine reducers
const reducers = combineReducers({
	diary,
	file
});

// Set up middleware
let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, createLogger()];
}

// Create store
export default createStore(reducers, applyMiddleware(...middleware));
