import { connect } from 'react-redux';

import Toolbar from './Toolbar';
import { search, setDateSelected } from '../../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		monthSelected: state.diary.monthSelected,
		searchKey: state.diary.searchKey
	};
}

function mapDispatchToProps(dispatch) {
	return {
		search: searchKey => dispatch(search(searchKey)),
		setDateSelected: date => dispatch(setDateSelected(date))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
