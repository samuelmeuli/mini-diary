import { connect } from "react-redux";

import { updateEntry } from "../../../../store/file/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import { IndexDate } from "../../../../types";
import Editor, { DispatchProps, StateProps } from "./Editor";

const mapStateToProps = (state: RootState): StateProps => ({
	enableSpellcheck: state.app.enableSpellcheck,
	hideTitles: state.app.hideTitles,
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateEntry: (entryDate: IndexDate, title: string, text: string): void =>
		dispatch(updateEntry(entryDate, title, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
