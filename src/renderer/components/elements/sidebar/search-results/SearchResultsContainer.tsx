import { Moment } from "moment-timezone";
import { connect } from "react-redux";

import { setEntrySelected } from "../../../../store/diary/actionCreators";
import { SetEntrySelectedAction } from "../../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import SearchResults, { DispatchProps, StateProps } from "./SearchResults";

const mapStateToProps = (state: RootState): StateProps => ({
	entries: state.file.entries,
	searchResults: state.diary.searchResults,
	entryIdSelected: state.diary.entryIdSelected,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setEntrySelected: (id: string, date: Moment): SetEntrySelectedAction =>
		dispatch(setEntrySelected(id, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
