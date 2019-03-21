import { connect } from "react-redux";

import { setPrefVisibility, updateThemePref } from "../../../../store/app/actionCreators";
import { testFileExists, updatePassword } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Preferences, { DispatchProps, StateProps } from "./Preferences";

const mapStateToProps = (state: RootState): StateProps => ({
	hashedPassword: state.file.hashedPassword,
	themePref: state.app.themePref,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updatePassword: (password: string) => dispatch(updatePassword(password)),
	setPrefVisibility: (showPref: boolean) => dispatch(setPrefVisibility(showPref)),
	testFileExists: () => dispatch(testFileExists()),
	updateThemePref: (themePref: ThemePref) => dispatch(updateThemePref(themePref)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Preferences);
