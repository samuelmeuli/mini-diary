import { connect } from 'react-redux';

import ViewSelector from './ViewSelector';
import { setDate, setView } from '../../../redux/actions/diaryActions';


function mapStateToProps(state) {
	return {
		view: state.diary.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDate: date => dispatch(setDate(date)),
		setView: view => dispatch(setView(view))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelector);
