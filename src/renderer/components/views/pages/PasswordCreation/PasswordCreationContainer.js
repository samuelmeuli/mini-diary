import { connect } from 'react-redux';

import PasswordCreation from './PasswordCreation';
import { createEncryptedFile, testFileExists } from '../../../../redux/actions/fileActions';


function mapDispatchToProps(dispatch) {
	return {
		createEncryptedFile: password => dispatch(createEncryptedFile(password)),
		testFileExists: () => dispatch(testFileExists())
	};
}

export default connect(null, mapDispatchToProps)(PasswordCreation);
