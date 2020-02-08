import { connect } from "react-redux";

import { testFileExists } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import FileDirPref, { DispatchProps, StateProps } from "./FileDirPref";

const mapStateToProps = (state: RootState): StateProps => ({
	hashedPassword: state.file.hashedPassword,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	testFileExists: (): void => dispatch(testFileExists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileDirPref);
