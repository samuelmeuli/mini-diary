import { connect } from "react-redux";

import { testFileExists } from "../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../store/store";
import App, { DispatchProps, StateProps } from "./App";

const mapStateToProps = (state: RootState): StateProps => ({
	exportErrorMsg: state.export.exportErrorMsg,
	exportStatus: state.export.exportStatus,
	fileExists: state.file.fileExists,
	hashedPassword: state.file.hashedPassword,
	importErrorMsg: state.import.importErrorMsg,
	importStatus: state.import.importStatus,
	overlay: state.app.overlay,
	theme: state.app.theme,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	testFileExists: (): void => dispatch(testFileExists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
