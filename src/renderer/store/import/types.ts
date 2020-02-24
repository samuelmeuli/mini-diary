import { Action } from "redux";

import { ImportFormat, Status } from "../../types";

// State

export interface ImportState {
	importErrorMsg: string;
	importFormat: ImportFormat;
	importStatus: Status;
}

// Action types

export const IMPORT_IN_PROGRESS = "IMPORT_IN_PROGRESS";
export const IMPORT_ERROR = "IMPORT_ERROR";
export const IMPORT_SUCCESS = "IMPORT_SUCCESS";
export const SET_IMPORT_FORMAT = "SET_IMPORT_FORMAT";

// Actions

export interface SetImportFormatAction extends Action {
	type: typeof SET_IMPORT_FORMAT;
	payload: {
		importFormat: ImportFormat;
	};
}

export interface SetImportInProgressAction extends Action {
	type: typeof IMPORT_IN_PROGRESS;
}

export interface SetImportErrorAction extends Action {
	type: typeof IMPORT_ERROR;
	payload: {
		importErrorMsg: string;
	};
}

export interface SetImportSuccessAction extends Action {
	type: typeof IMPORT_SUCCESS;
}

export type ImportAction =
	| SetImportFormatAction
	| SetImportInProgressAction
	| SetImportErrorAction
	| SetImportSuccessAction;
