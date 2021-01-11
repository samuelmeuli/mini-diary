import { createDate } from "../../utils/dateFormat";
import {
	DiaryAction,
	DiaryState,
	SET_DATE_SELECTED,
	SET_SEARCH_KEY,
	SET_SEARCH_RESULTS,
	SET_ENTRY_SELECTED,
} from "./types";

const today = createDate();

const initialState: DiaryState = {
	dateSelected: today,
	searchKey: "",
	searchResults: [],
	entryIdSelected: null,
};

function diaryReducer(state = initialState, action: DiaryAction): DiaryState {
	switch (action.type) {
		case SET_DATE_SELECTED: {
			return {
				...state,
				dateSelected: action.payload.dateSelected,
				entryIdSelected: null,
			};
		}
		case SET_SEARCH_KEY: {
			return {
				...state,
				searchKey: action.payload.searchKey,
			};
		}
		case SET_SEARCH_RESULTS: {
			return {
				...state,
				searchResults: action.payload.searchResults,
			};
		}
		case SET_ENTRY_SELECTED: {
			return {
				...state,
				entryIdSelected: action.payload.id,
				dateSelected: action.payload.dateSelected
					? action.payload.dateSelected
					: state.dateSelected,
			};
		}
		default:
			return state;
	}
}

export default diaryReducer;
