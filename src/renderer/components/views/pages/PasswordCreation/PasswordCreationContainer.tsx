import { connect } from "react-redux";

import { createEncryptedFile, testFileExists } from "../../../../store/file/actionCreators";
import { ThunkDispatchT } from "../../../../store/store";
import PasswordCreation from "./PasswordCreation";

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		createEncryptedFile: (password: string) => dispatch(createEncryptedFile(password)),
		testFileExists: () => dispatch(testFileExists()),
	};
}

export default connect(
	null,
	mapDispatchToProps,
)(PasswordCreation);
