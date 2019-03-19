import { connect } from "react-redux";

import { setPrefVisibility, updateThemePref } from "../../../../store/app/actionCreators";
import { testFileExists, updatePassword } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Preferences from "./Preferences";

function mapStateToProps(state: RootState) {
	return {
		themePref: state.app.themePref,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		updatePassword: (password: string) => dispatch(updatePassword(password)),
		setPrefVisibility: (showPref: boolean) => dispatch(setPrefVisibility(showPref)),
		testFileExists: () => dispatch(testFileExists()),
		updateThemePref: (themePref: ThemePref) => dispatch(updateThemePref(themePref)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Preferences);
