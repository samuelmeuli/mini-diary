import { connect } from 'react-redux';

import PasswordPrompt from './PasswordPrompt';
import { decryptFile } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		decryptErrorMsg: state.file.decryptErrorMsg,
		decryptStatus: state.file.decryptStatus
	};
}

function mapDispatchToProps(dispatch) {
	return {
		decryptFile: password => dispatch(decryptFile(password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPrompt);
