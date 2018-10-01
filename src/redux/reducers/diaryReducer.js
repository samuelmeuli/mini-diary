import Day from '../../helpers/Day';


function diary(state = {
	date: new Day()
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
