import { connect } from 'react-redux';

import Preferences from './Preferences';
import { setTheme, setPreferencesVisibility } from '../../../../redux/actions/appActions';
import { testFileExists, updatePassword } from '../../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		theme: state.app.theme
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updatePassword: password => dispatch(updatePassword(password)),
		setPreferencesVisibility: showPreferences => (
			dispatch(setPreferencesVisibility(showPreferences))
		),
		setTheme: theme => dispatch(setTheme(theme)),
		testFileExists: () => dispatch(testFileExists())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
