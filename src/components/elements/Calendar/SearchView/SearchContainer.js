import { connect } from 'react-redux';

import Search from './Search';
import { setDateSelected } from '../../../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries,
		searchResults: state.diary.searchResults
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDateSelected: day => dispatch(setDateSelected(day))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
