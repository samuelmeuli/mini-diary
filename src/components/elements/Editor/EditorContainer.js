import { connect } from 'react-redux';

import Editor from './Editor';
import { updateFile } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries,
		hashedPassword: state.file.hashedPassword
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateFile: (filePath, hashedPassword, dateFormatted, title, text) => (
			dispatch(updateFile(filePath, hashedPassword, dateFormatted, title, text))
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
