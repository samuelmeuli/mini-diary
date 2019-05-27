import { connect } from "react-redux";

import {
	setPrefVisibility,
	updateFutureEntriesPref,
	updateThemePref,
} from "../../../../store/app/actionCreators";
import { SetPrefVisibilityAction } from "../../../../store/app/types";
import { testFileExists, updatePassword } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Preferences, { DispatchProps, StateProps } from "./Preferences";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
	hashedPassword: state.file.hashedPassword,
	themePref: state.app.themePref,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setPrefVisibility: (showPref: boolean): SetPrefVisibilityAction =>
		dispatch(setPrefVisibility(showPref)),
	testFileExists: (): void => dispatch(testFileExists()),
	updateFutureEntriesPref: (allowFutureEntries: boolean): void =>
		dispatch(updateFutureEntriesPref(allowFutureEntries)),
	updatePassword: (password: string): void => dispatch(updatePassword(password)),
	updateThemePref: (themePref: ThemePref): void => dispatch(updateThemePref(themePref)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Preferences);
