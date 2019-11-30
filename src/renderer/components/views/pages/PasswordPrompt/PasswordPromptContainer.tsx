import { connect } from "react-redux";

import { decryptFile } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import PasswordPrompt, { DispatchProps, StateProps } from "./PasswordPrompt";

const mapStateToProps = (state: RootState): StateProps => ({
	decryptErrorMsg: state.file.decryptErrorMsg,
	decryptStatus: state.file.decryptStatus,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	decryptFile: (password: string): void => dispatch(decryptFile(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPrompt);
