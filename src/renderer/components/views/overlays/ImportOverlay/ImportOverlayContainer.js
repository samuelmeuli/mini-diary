import { connect } from 'react-redux';

import ImportOverlay from './ImportOverlay';
import { hideImportOverlay, runImport } from '../../../../redux/actions/importActions';


function mapStateToProps(state) {
	return {
		importFormat: state.import.importFormat
	};
}

function mapDispatchToProps(dispatch) {
	return {
		hideImportOverlay: () => dispatch(hideImportOverlay()),
		runImport: importFilePath => dispatch(runImport(importFilePath))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportOverlay);
