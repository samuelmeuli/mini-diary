import { connect } from "react-redux";

import { testFileExists } from "../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../store/store";
import App from "./App";

function mapStateToProps(state: RootState) {
	return {
		exportErrorMsg: state.export.exportErrorMsg,
		exportStatus: state.export.exportStatus,
		fileExists: state.file.fileExists,
		hashedPassword: state.file.hashedPassword,
		importErrorMsg: state.import.importErrorMsg,
		importStatus: state.import.importStatus,
		showImportOverlay: state.import.showImportOverlay,
		showPref: state.app.showPref,
		theme: state.app.theme,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		testFileExists: () => dispatch(testFileExists()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
