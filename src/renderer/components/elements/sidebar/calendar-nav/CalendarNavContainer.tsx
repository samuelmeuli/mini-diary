import { connect } from "react-redux";

import {
	setMonthSelectedNext,
	setMonthSelectedPrevious,
} from "../../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import CalendarNav, { DispatchProps, StateProps } from "./CalendarNav";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
	dateSelected: state.diary.dateSelected,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setMonthSelectedNext: (): void => dispatch(setMonthSelectedNext()),
	setMonthSelectedPrevious: (): void => dispatch(setMonthSelectedPrevious()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarNav);
