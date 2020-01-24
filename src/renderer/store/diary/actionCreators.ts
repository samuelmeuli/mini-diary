import moment from "moment";

import { MAX_DATE, MIN_DATE } from "../../constants";
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
	let dateValidated = dateSelected;
	if (dateSelected < MIN_DATE) {
		dateValidated = MIN_DATE;
	} else if (dateSelected > MAX_DATE) {
		dateValidated = MAX_DATE;
	}
	return {
		type: SET_DATE_SELECTED,
		payload: {
			dateSelected: dateValidated,
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

function setSearchResults(searchResults: string[]): SetSearchResultsAction {
	return {
		type: SET_SEARCH_RESULTS,
		payload: {
			searchResults,
		},
	};
}

// Thunks

export const search = (searchKey: string): ThunkActionT => (dispatch): void => {
	dispatch(setSearchKey(searchKey));
	const searchResults = searchIndex(searchKey);
	dispatch(setSearchResults(searchResults));
};

export const setDaySelectedNext = (): ThunkActionT => (dispatch, getState): void => {
	const { app, diary } = getState();
	const { allowFutureEntries } = app;
	const { dateSelected } = diary;
	const nextDay = moment(dateSelected).add(1, "days");
	if (allowFutureEntries || nextDay.isSameOrBefore(moment(), "day")) {
		dispatch(setDateSelected(nextDay.toDate()));
	}
};

export const setDaySelectedPrevious = (): ThunkActionT => (dispatch, getState): void => {
	const { dateSelected } = getState().diary;
	const previousDay = moment(dateSelected).subtract(1, "days");
	dispatch(setDateSelected(previousDay.toDate()));
};

export const setDaySelectedToday = (): ThunkActionT => (dispatch): void => {
	const today = new Date();
	dispatch(setDateSelected(today));
};

export const setMonthSelectedNext = (): ThunkActionT => (dispatch, getState): void => {
	const { app, diary } = getState();
	const { allowFutureEntries } = app;
	const { monthSelected } = diary;
	const nextMonth = moment(monthSelected)
		.add(1, "months")
		.startOf("month");
	if (allowFutureEntries || nextMonth.isSameOrBefore(moment(), "month")) {
		dispatch(setDateSelected(nextMonth.toDate()));
	}
};

export const setMonthSelectedPrevious = (): ThunkActionT => (dispatch, getState): void => {
	const { monthSelected } = getState().diary;
	const previousMonth = moment(monthSelected)
		.subtract(1, "months")
		.startOf("month");
	dispatch(setDateSelected(previousMonth.toDate()));
};
