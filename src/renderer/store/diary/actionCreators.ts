import moment, { Moment } from "moment";

import { MAX_DATE, MIN_DATE } from "../../constants";
import { createDate, parseDate } from "../../utils/dateFormat";
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

export function setDateSelected(dateSelected: Moment): SetDateSelectedAction {
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
	const nextDay = parseDate(dateSelected).add(1, "days");
	if (allowFutureEntries || nextDay.isSameOrBefore(createDate(), "day")) {
		dispatch(setDateSelected(nextDay));
	}
};

export const setDaySelectedPrevious = (): ThunkActionT => (dispatch, getState): void => {
	const { dateSelected } = getState().diary;
	const previousDay = parseDate(dateSelected).subtract(1, "days");
	dispatch(setDateSelected(previousDay));
};

export const setDaySelectedToday = (): ThunkActionT => (dispatch): void => {
	const today = createDate();
	dispatch(setDateSelected(today));
};

export const setMonthSelectedNext = (): ThunkActionT => (dispatch, getState): void => {
	const { app, diary } = getState();
	const { allowFutureEntries } = app;
	const { monthSelected } = diary;
	const nextMonth = moment
		.utc(monthSelected)
		.add(1, "months")
		.startOf("month");
	const today = createDate();
	if (allowFutureEntries || nextMonth.isSameOrBefore(today, "month")) {
		dispatch(setDateSelected(createDate()));
	}
};

export const setMonthSelectedPrevious = (): ThunkActionT => (dispatch, getState): void => {
	const { monthSelected } = getState().diary;
	const previousMonth = moment
		.utc(monthSelected)
		.subtract(1, "months")
		.startOf("month");
	dispatch(setDateSelected(previousMonth));
};
