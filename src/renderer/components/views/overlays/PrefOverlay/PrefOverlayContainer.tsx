import { connect } from "react-redux";

import { updateFutureEntriesPref, updateThemePref } from "../../../../store/app/actionCreators";
import { testFileExists, updatePassword } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import PrefOverlay, { DispatchProps, StateProps } from "./PrefOverlay";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
	hashedPassword: state.file.hashedPassword,
	themePref: state.app.themePref,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	testFileExists: (): void => dispatch(testFileExists()),
	updateFutureEntriesPref: (allowFutureEntries: boolean): void =>
		dispatch(updateFutureEntriesPref(allowFutureEntries)),
	updatePassword: (password: string): void => dispatch(updatePassword(password)),
	updateThemePref: (themePref: ThemePref): void => dispatch(updateThemePref(themePref)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PrefOverlay);
