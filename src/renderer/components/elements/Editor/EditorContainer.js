import { connect } from 'react-redux';

import Editor from './Editor';
import { updateEntry } from '../../../redux/actions/fileActions';


function mapStateToProps(state) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateEntry: (dateFormatted, title, text) => dispatch(updateEntry(dateFormatted, title, text))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
