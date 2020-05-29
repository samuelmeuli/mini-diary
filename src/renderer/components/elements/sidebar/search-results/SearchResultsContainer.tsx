import { Moment } from "moment-timezone";
import { connect } from "react-redux";

import { setDateSelected } from "../../../../store/diary/actionCreators";
import { SetDateSelectedAction } from "../../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import SearchResults, { DispatchProps, StateProps } from "./SearchResults";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
	searchResults: state.diary.searchResults,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setDateSelected: (date: Moment): SetDateSelectedAction => dispatch(setDateSelected(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
