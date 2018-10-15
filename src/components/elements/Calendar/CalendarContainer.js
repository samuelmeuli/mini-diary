import { connect } from 'react-redux';

import Calendar from './Calendar';


function mapStateToProps(state) {
	return {
		view: state.diary.view
	};
}

export default connect(mapStateToProps)(Calendar);
