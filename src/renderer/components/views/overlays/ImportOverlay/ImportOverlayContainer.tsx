import { connect } from "react-redux";

import { hideImportOverlay, runImport } from "../../../../store/import/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import ImportOverlay from "./ImportOverlay";

function mapStateToProps(state: RootState) {
	return {
		importFormat: state.import.importFormat,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		hideImportOverlay: () => dispatch(hideImportOverlay()),
		runImport: (importFilePath: string) => dispatch(runImport(importFilePath)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ImportOverlay);
