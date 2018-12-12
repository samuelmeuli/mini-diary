const today = new Date();

function diary(state = {
	dateSelected: today,
	monthSelected: today,
	searchKey: '',
	searchResults: []
}, action) {
	switch (action.type) {
		case 'SET_DATE_SELECTED': {
			return {
				...state,
				dateSelected: action.payload.dateSelected,
				monthSelected: action.payload.dateSelected
			};
		}
		case 'SET_SEARCH_KEY': {
			return {
				...state,
				searchKey: action.payload.searchKey
			};
		}
		case 'SET_SEARCH_RESULTS': {
			return {
				...state,
				searchResults: action.payload.searchResults
			};
		}
		default:
			return state;
	}
}

export default diary;
