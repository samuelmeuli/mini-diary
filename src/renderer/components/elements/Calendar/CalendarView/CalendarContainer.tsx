import { connect } from "react-redux";

import { setDateSelected } from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Calendar from "./Calendar";

function mapStateToProps(state: RootState) {
	return {
		dateSelected: state.diary.dateSelected,
		monthSelected: state.diary.monthSelected,
		entries: state.file.entries,
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
)(Calendar);
