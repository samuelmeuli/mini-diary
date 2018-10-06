import { connect } from 'react-redux';

import Calendar from './Calendar';


function mapStateToProps(state) {
	return {
		date: state.diary.date
	};
}

export default connect(mapStateToProps, null)(Calendar);
