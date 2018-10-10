import { connect } from 'react-redux';

import Editor from './Editor';
import { encryptFile } from '../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		date: state.diary.date,
		entries: state.file.entries,
		password: state.file.password
	};
}

function mapDispatchToProps(dispatch) {
	return {
		encryptFile: (filePath, password, content) => (
			dispatch(encryptFile(filePath, password, content))
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
