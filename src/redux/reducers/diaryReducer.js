function diary(state = {
	date: new Date(),
	view: 'grid'
}, action) {
	switch (action.type) {
		case 'SET_DATE': {
			return {
				...state,
				date: action.payload.date
			};
		}
		case 'SET_VIEW': {
			return {
				...state,
				view: action.payload.view
			};
		}
		default:
			return state;
	}
}

export default diary;
