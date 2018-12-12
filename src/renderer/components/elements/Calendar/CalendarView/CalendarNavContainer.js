import { connect } from 'react-redux';

import CalendarNav from './CalendarNav';
import {
	setMonthSelectedNext,
	setMonthSelectedPrevious
} from '../../../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		monthSelected: state.diary.monthSelected
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setMonthSelectedNext: () => dispatch(setMonthSelectedNext()),
		setMonthSelectedPrevious: () => dispatch(setMonthSelectedPrevious())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarNav);
