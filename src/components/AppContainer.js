import { connect } from 'react-redux';

import App from './App';
import { testFileExists } from '../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		fileExists: state.file.fileExists,
		password: state.file.password,
		theme: state.app.theme
	};
}

function mapDispatchToProps(dispatch) {
	return {
		testFileExists: filePath => dispatch(testFileExists(filePath))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
