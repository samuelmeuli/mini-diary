import { Moment } from "moment-timezone";
import { Action } from "redux";

import { SearchResult } from "../../utils/searchIndex";

// State

export interface DiaryState {
	dateSelected: Moment;
	searchKey: string;
	searchResults: SearchResult[];
	entryIdSelected: string | null;
}

// Action types

export const SET_DATE_SELECTED = "SET_DATE_SELECTED";
export const SET_ENTRY_SELECTED = "SET_ENTRY_SELECTED";
export const SET_SEARCH_KEY = "SET_SEARCH_KEY";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

// Actions

export interface SetDateSelectedAction extends Action {
	type: typeof SET_DATE_SELECTED;
	payload: {
		dateSelected: Moment;
	};
}

export interface SetEntrySelectedAction extends Action {
	type: typeof SET_ENTRY_SELECTED;
	payload: {
		id: string;
		dateSelected: Moment | null;
	};
}

export interface SetSearchKeyAction extends Action {
	type: typeof SET_SEARCH_KEY;
	payload: {
		searchKey: string;
	};
}

export interface SetSearchResultsAction extends Action {
	type: typeof SET_SEARCH_RESULTS;
	payload: {
		searchResults: SearchResult[];
	};
}

export type DiaryAction =
	| SetDateSelectedAction
	| SetSearchKeyAction
	| SetSearchResultsAction
	| SetEntrySelectedAction;
