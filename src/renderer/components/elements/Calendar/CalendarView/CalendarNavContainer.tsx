import { connect } from "react-redux";

import {
	setMonthSelectedNext,
	setMonthSelectedPrevious,
} from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import CalendarNav from "./CalendarNav";

function mapStateToProps(state: RootState) {
	return {
		monthSelected: state.diary.monthSelected,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		setMonthSelectedNext: () => dispatch(setMonthSelectedNext()),
		setMonthSelectedPrevious: () => dispatch(setMonthSelectedPrevious()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CalendarNav);
