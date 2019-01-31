import { connect } from 'react-redux';

import Preferences from './Preferences';
import { setPreferencesVisibility, updateThemePref } from '../../../../redux/actions/appActions';
import { testFileExists, updatePassword } from '../../../../redux/actions/fileActions';

function mapStateToProps(state) {
	return {
		themePref: state.app.themePref
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updatePassword: password => dispatch(updatePassword(password)),
		setPreferencesVisibility: showPreferences =>
			dispatch(setPreferencesVisibility(showPreferences)),
		testFileExists: () => dispatch(testFileExists()),
		updateThemePref: themePref => dispatch(updateThemePref(themePref))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Preferences);
