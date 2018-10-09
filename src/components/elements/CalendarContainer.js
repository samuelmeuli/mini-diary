import { connect } from 'react-redux';

import Calendar from './Calendar';
import { setDate } from '../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		date: state.diary.date,
		entries: state.file.entries
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDate: day => dispatch(setDate(day))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
