import { connect } from "react-redux";

import { updateEntry } from "../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../store/store";
import Editor from "./Editor";

function mapStateToProps(state: RootState) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		updateEntry: (entryDate: IndexDate, title: string, text: string) => dispatch(updateEntry(entryDate, title, text)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Editor);
