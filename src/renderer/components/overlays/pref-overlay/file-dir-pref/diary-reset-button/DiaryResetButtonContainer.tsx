import { connect } from "react-redux";

import { resetDiary, testFileExists } from "../../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import DiaryResetButton, { DispatchProps, StateProps } from "./DiaryResetButton";

const mapStateToProps = (state: RootState): StateProps => ({
	fileExists: state.file.fileExists,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	resetDiary: (): void => dispatch(resetDiary()),
	testFileExists: (): void => dispatch(testFileExists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResetButton);
