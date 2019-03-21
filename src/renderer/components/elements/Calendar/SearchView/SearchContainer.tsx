import { connect } from "react-redux";

import { setDateSelected } from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Search, { DispatchProps, StateProps } from "./Search";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
	searchResults: state.diary.searchResults,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setDateSelected: (date: Date) => dispatch(setDateSelected(date)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Search);
