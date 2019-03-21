import { connect } from "react-redux";

import { setDateSelected } from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Calendar, { DispatchProps, StateProps } from "./Calendar";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	monthSelected: state.diary.monthSelected,
	entries: state.file.entries,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setDateSelected: (date: Date) => dispatch(setDateSelected(date)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Calendar);
