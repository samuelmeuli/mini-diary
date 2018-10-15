// Action creators

export function setDate(date) {
	return {
		type: 'SET_DATE',
		payload: {
			date
		}
	};
}

export function setView(view) {
	return {
		type: 'SET_VIEW',
		payload: {
			view
		}
	};
}
