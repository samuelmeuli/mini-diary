import { Action } from "redux";

import { Status } from "../../types";

// State

export interface ExportState {
	exportErrorMsg: string;
	exportStatus: Status;
}

// Action types

export const EXPORT_IN_PROGRESS = "EXPORT_IN_PROGRESS";
export const EXPORT_ERROR = "EXPORT_ERROR";
export const EXPORT_SUCCESS = "EXPORT_SUCCESS";

// Actions

export interface SetExportInProgressAction extends Action {
	type: typeof EXPORT_IN_PROGRESS;
}

export interface SetExportErrorAction extends Action {
	type: typeof EXPORT_ERROR;
	payload: {
		exportErrorMsg: string;
	};
}

export interface SetExportSuccessAction extends Action {
	type: typeof EXPORT_SUCCESS;
}

export type ExportAction =
	| SetExportInProgressAction
	| SetExportErrorAction
	| SetExportSuccessAction;
