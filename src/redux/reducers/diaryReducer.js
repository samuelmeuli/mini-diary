function diary(state = {
	date: new Date()
}, action) {
	switch (action.type) {
		case 'SET_DATE': {
			return {
				...state,
				date: action.payload.date
			};
		}
		default:
			return state;
	}
}

export default diary;
