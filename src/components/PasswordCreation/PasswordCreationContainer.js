import { connect } from 'react-redux';

import PasswordCreation from './PasswordCreation';
import { encryptFile, setPassword, testFileExists } from '../../redux/actions/fileActions';


function mapDispatchToProps(dispatch) {
	return {
		encryptFile: (filePath, password, content) => (
			dispatch(encryptFile(filePath, password, content))
		),
		setPassword: password => dispatch(setPassword(password)),
		testFileExists: filePath => dispatch(testFileExists(filePath))
	};
}

export default connect(null, mapDispatchToProps)(PasswordCreation);
