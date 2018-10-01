import { connect } from 'react-redux';

import PasswordPrompt from './PasswordPrompt';
import { decryptFile } from '../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		decryptStatus: state.file.decryptStatus
	};
}

function mapDispatchToProps(dispatch) {
	return {
		decrypt: (entries, password) => dispatch(decryptFile(entries, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPrompt);
