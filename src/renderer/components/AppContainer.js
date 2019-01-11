import { connect } from 'react-redux';

import App from './App';
import { testFileExists } from '../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		fileExists: state.file.fileExists,
		hashedPassword: state.file.hashedPassword,
		exportErrorMsg: state.export.exportErrorMsg,
		exportStatus: state.export.exportStatus,
		importErrorMsg: state.import.importErrorMsg,
		importStatus: state.import.importStatus,
		showImportOverlay: state.import.showImportOverlay,
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
