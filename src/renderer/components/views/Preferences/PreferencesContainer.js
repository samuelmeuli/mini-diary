import { connect } from 'react-redux';

import Preferences from './Preferences';
import { setTheme, setPreferencesVisibility } from '../../../redux/actions/appActions';
import { createEncryptedFile, testFileExists } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		theme: state.app.theme
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createEncryptedFile: (filePath, password) => dispatch(createEncryptedFile(filePath, password)),
		setPreferencesVisibility: showPreferences => (
			dispatch(setPreferencesVisibility(showPreferences))
		),
		setTheme: theme => dispatch(setTheme(theme)),
		testFileExists: filePath => dispatch(testFileExists(filePath))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
