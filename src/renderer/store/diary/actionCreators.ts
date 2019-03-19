import moment from "moment";

import { searchIndex } from "../../utils/searchIndex";
import { ThunkActionT } from "../store";
import {
	SET_DATE_SELECTED,
	SET_SEARCH_KEY,
	SET_SEARCH_RESULTS,
	SetDateSelectedAction,
	SetSearchKeyAction,
	SetSearchResultsAction,
} from "./types";

// Action creators

export function setDateSelected(dateSelected: Date): SetDateSelectedAction {
	return {
		type: SET_DATE_SELECTED,
		payload: {
			dateSelected,
		},
	};
}

function setSearchKey(searchKey: string): SetSearchKeyAction {
	return {
		type: SET_SEARCH_KEY,
		payload: {
			searchKey,
		},
	};
}

function setSearchResults(searchResults: SearchResult[]): SetSearchResultsAction {
	return {
		type: SET_SEARCH_RESULTS,
		payload: {
			searchResults,
		},
	};
}

// Thunks

export const search = (searchKey: string): ThunkActionT => dispatch => {
	dispatch(setSearchKey(searchKey));
	const searchResults = searchIndex(searchKey);
	dispatch(setSearchResults(searchResults));
};

export const setDaySelectedNext = (): ThunkActionT => (dispatch, getState) => {
	const { dateSelected } = getState().diary;
	const nextDay = moment(dateSelected).add(1, "days");
	if (nextDay.isSameOrBefore(moment(), "day")) {
		dispatch(setDateSelected(nextDay.toDate()));
	}
};

export const setDateSelectedPrevious = (): ThunkActionT => (dispatch, getState) => {
	const { dateSelected } = getState().diary;
	const previousDay = moment(dateSelected).subtract(1, "days");
	dispatch(setDateSelected(previousDay.toDate()));
};

export const setMonthSelectedNext = (): ThunkActionT => (dispatch, getState) => {
	const { monthSelected } = getState().diary;
	const nextMonth = moment(monthSelected)
		.add(1, "months")
		.startOf("month");
	if (nextMonth.isSameOrBefore(moment(), "month")) {
		dispatch(setDateSelected(nextMonth.toDate()));
	}
};

export const setMonthSelectedPrevious = (): ThunkActionT => (dispatch, getState) => {
	const { monthSelected } = getState().diary;
	const previousMonth = moment(monthSelected)
		.subtract(1, "months")
		.startOf("month");
	dispatch(setDateSelected(previousMonth.toDate()));
};
