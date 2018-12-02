import { connect } from 'react-redux';

import Editor from './Editor';
import { encryptFile } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries,
		hashedPassword: state.file.hashedPassword
	};
}

function mapDispatchToProps(dispatch) {
	return {
		encryptFile: (filePath, hashedPassword, content) => (
			dispatch(encryptFile(filePath, hashedPassword, content))
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
