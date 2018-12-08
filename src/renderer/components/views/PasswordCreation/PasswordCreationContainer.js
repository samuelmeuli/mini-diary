import { connect } from 'react-redux';

import PasswordCreation from './PasswordCreation';
import { createEncryptedFile, testFileExists } from '../../../redux/actions/fileActions';


function mapDispatchToProps(dispatch) {
	return {
		createEncryptedFile: (filePath, password) => dispatch(createEncryptedFile(filePath, password)),
		testFileExists: filePath => dispatch(testFileExists(filePath))
	};
}

export default connect(null, mapDispatchToProps)(PasswordCreation);
