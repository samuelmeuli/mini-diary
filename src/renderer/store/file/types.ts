import { Action } from "redux";

import { Status, Entries } from "../../types";

// State

export interface FileState {
	decryptErrorMsg: string;
	decryptStatus: Status;
	encryptErrorMsg: string;
	encryptStatus: Status;
	entries: Entries;
	fileExists: boolean;
	hashedPassword: string;
}

// Action types

export const CLEAR_FILE_STATE = "CLEAR_FILE_STATE";
export const DECRYPT_IN_PROGRESS = "DECRYPT_IN_PROGRESS";
export const DECRYPT_ERROR = "DECRYPT_ERROR";
export const DECRYPT_SUCCESS = "DECRYPT_SUCCESS";
export const ENCRYPT_IN_PROGRESS = "ENCRYPT_IN_PROGRESS";
export const ENCRYPT_ERROR = "ENCRYPT_ERROR";
export const ENCRYPT_SUCCESS = "ENCRYPT_SUCCESS";
export const SET_FILE_EXISTS = "SET_FILE_EXISTS";
export const SET_HASHED_PASSWORD = "SET_HASHED_PASSWORD";

// Actions

export interface ClearFileStateAction extends Action {
	type: typeof CLEAR_FILE_STATE;
}

export interface SetDecryptInProgressAction extends Action {
	type: typeof DECRYPT_IN_PROGRESS;
}

export interface SetDecryptErrorAction extends Action {
	type: typeof DECRYPT_ERROR;
	payload: {
		decryptErrorMsg: string;
	};
}

export interface SetDecryptSuccessAction extends Action {
	type: typeof DECRYPT_SUCCESS;
	payload: {
		entries: Entries;
	};
}

export interface SetEncryptInProgressAction extends Action {
	type: typeof ENCRYPT_IN_PROGRESS;
}

export interface SetEncryptErrorAction extends Action {
	type: typeof ENCRYPT_ERROR;
	payload: {
		encryptErrorMsg: string;
	};
}

export interface SetEncryptSuccessAction extends Action {
	type: typeof ENCRYPT_SUCCESS;
	payload: {
		entries: Entries;
	};
}

export interface SetFileExistsAction extends Action {
	type: typeof SET_FILE_EXISTS;
	payload: {
		fileExists: boolean;
	};
}

export interface SetHashedPasswordAction extends Action {
	type: typeof SET_HASHED_PASSWORD;
	payload: {
		hashedPassword: string;
	};
}

export type FileAction =
	| ClearFileStateAction
	| SetDecryptInProgressAction
	| SetDecryptErrorAction
	| SetDecryptSuccessAction
	| SetEncryptInProgressAction
	| SetEncryptErrorAction
	| SetEncryptSuccessAction
	| SetFileExistsAction
	| SetHashedPasswordAction;
