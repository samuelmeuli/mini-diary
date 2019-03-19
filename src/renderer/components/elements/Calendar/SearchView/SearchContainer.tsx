import { connect } from "react-redux";

import { setDateSelected } from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Search from "./Search";

function mapStateToProps(state: RootState) {
	return {
		dateSelected: state.diary.dateSelected,
		entries: state.file.entries,
		searchResults: state.diary.searchResults,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		setDateSelected: (date: Date) => dispatch(setDateSelected(date)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Search);
