import { connect } from 'react-redux';

import Editor from './Editor';


function mapStateToProps(state) {
	return {
		date: state.diary.date
	};
}

export default connect(mapStateToProps)(Editor);
