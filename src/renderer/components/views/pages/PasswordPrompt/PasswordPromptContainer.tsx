import { connect } from "react-redux";

import { decryptFile } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import PasswordPrompt from "./PasswordPrompt";

function mapStateToProps(state: RootState) {
	return {
		decryptErrorMsg: state.file.decryptErrorMsg,
		decryptStatus: state.file.decryptStatus,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		decryptFile: (password: string) => dispatch(decryptFile(password)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PasswordPrompt);
