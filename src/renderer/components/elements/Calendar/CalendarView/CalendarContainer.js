import { connect } from 'react-redux';

import Calendar from './Calendar';
import { setDateSelected } from '../../../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		monthSelected: state.diary.monthSelected,
		entries: state.file.entries
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDateSelected: day => dispatch(setDateSelected(day))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
