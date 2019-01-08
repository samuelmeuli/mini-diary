import { connect } from 'react-redux';

import Editor from './Editor';
import { updateFile } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateFile: (dateFormatted, title, text) => dispatch(updateFile(dateFormatted, title, text))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
