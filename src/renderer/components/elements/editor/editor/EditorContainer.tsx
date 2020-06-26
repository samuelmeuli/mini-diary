import { connect } from "react-redux";

import { updateEntry } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Editor, { DispatchProps, StateProps } from "./Editor";

const mapStateToProps = (state: RootState): StateProps => ({
	enableSpellcheck: state.app.enableSpellcheck,
	hideTitles: state.app.hideTitles,
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
	entryIdSelected: state.diary.entryIdSelected,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateEntry: (entryDate: string, title: string, text: string, id: string): void =>
		dispatch(updateEntry(entryDate, title, text, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
