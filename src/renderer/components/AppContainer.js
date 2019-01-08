import { connect } from 'react-redux';

import App from './App';
import { testFileExists } from '../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		fileExists: state.file.fileExists,
		hashedPassword: state.file.hashedPassword,
		showPreferences: state.app.showPreferences,
		theme: state.app.theme
	};
}

function mapDispatchToProps(dispatch) {
	return {
		testFileExists: () => dispatch(testFileExists())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
