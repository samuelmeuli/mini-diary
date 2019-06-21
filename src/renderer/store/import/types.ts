import { Action } from "redux";

// State

export interface ImportState {
	importErrorMsg: string;
	importFormat: ImportFormat | null;
	importStatus: Status;
	showImportOverlay: boolean;
}

// Action types

export const IMPORT_IN_PROGRESS = "IMPORT_IN_PROGRESS";
export const IMPORT_ERROR = "IMPORT_ERROR";
export const IMPORT_SUCCESS = "IMPORT_SUCCESS";
export const SET_IMPORT_DIALOG = "SET_IMPORT_DIALOG";

// Actions

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

export interface SetImportOverlayAction extends Action {
	type: typeof SET_IMPORT_DIALOG;
	payload: {
		importFormat: ImportFormat | null;
		showImportOverlay: boolean;
	};
}

export type ImportAction =
	| SetImportInProgressAction
	| SetImportErrorAction
	| SetImportSuccessAction
	| SetImportOverlayAction;
