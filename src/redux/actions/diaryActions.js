import { searchIndex } from '../../helpers/searchIndex';


// Action creators

export function setDateSelected(dateSelected) {
	return {
		type: 'SET_SELECTED_DATE',
		payload: {
			dateSelected
		}
	};
}

function setSearchKey(searchKey) {
	return {
		type: 'SET_SEARCH_KEY',
		payload: {
			searchKey
		}
	};
}

function setSearchResults(searchResults) {
	return {
		type: 'SET_SEARCH_RESULTS',
		payload: {
			searchResults
		}
	};
}


// Thunks

export function search(searchKey) {
	return (dispatch) => {
		dispatch(setSearchKey(searchKey));
		const searchResults = searchIndex(searchKey);
		dispatch(setSearchResults(searchResults));
	};
}
