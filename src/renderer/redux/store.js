import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import app from './reducers/appReducer';
import diary from './reducers/diaryReducer';
import exportReducer from './reducers/exportReducer';
import file from './reducers/fileReducer';
import importReducer from './reducers/importReducer';

// Combine reducers
const reducers = combineReducers({
	app,
	diary,
	file,
	export: exportReducer,
	import: importReducer
});

// Set up middleware
let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, createLogger()];
}

// Create store
export default createStore(reducers, applyMiddleware(...middleware));
