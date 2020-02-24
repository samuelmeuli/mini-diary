import { connect } from "react-redux";

import { updateFirstDayOfWeekPref } from "../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import { Weekday } from "../../../../types";
import FirstDayOfWeekPref, { DispatchProps, StateProps } from "./FirstDayOfWeekPref";

const mapStateToProps = (state: RootState): StateProps => ({
	firstDayOfWeek: state.app.firstDayOfWeek,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateFirstDayOfWeekPref: (firstDayOfWeek: Weekday | null): void =>
		dispatch(updateFirstDayOfWeekPref(firstDayOfWeek)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstDayOfWeekPref);
