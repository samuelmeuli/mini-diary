import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from "redux-thunk";

import appReducer from "./app/reducer";
import { AppAction } from "./app/types";
import diaryReducer from "./diary/reducer";
import { DiaryAction } from "./diary/types";
import exportReducer from "./export/reducer";
import { ExportAction } from "./export/types";
import fileReducer from "./file/reducer";
import { FileAction } from "./file/types";
import importReducer from "./import/reducer";
import { ImportAction } from "./import/types";

// Combine reducers
const rootReducer = combineReducers({
	app: appReducer,
	diary: diaryReducer,
	file: fileReducer,
	export: exportReducer,
	import: importReducer,
});

export type RootAction = AppAction | DiaryAction | ExportAction | FileAction | ImportAction;
export type RootState = ReturnType<typeof rootReducer>;
export type ThunkActionT = ThunkAction<void, RootState, void, RootAction>;
export type ThunkDispatchT = ThunkDispatch<RootState, void, RootAction>;

// Set up middleware
let middleware = [thunk as ThunkMiddleware<RootState, RootAction>];
if (process.env.NODE_ENV !== "production") {
	middleware = [...middleware, createLogger()];
}

// Create store
export default createStore(rootReducer, applyMiddleware(...middleware));
