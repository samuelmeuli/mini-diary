import { Moment } from "moment-timezone";
import { connect } from "react-redux";

import { setDateSelected, setEntrySelected } from "../../../../store/diary/actionCreators";
import { SetDateSelectedAction, SetEntrySelectedAction } from "../../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import Calendar, { DispatchProps, StateProps } from "./Calendar";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
	dateSelected: state.diary.dateSelected,
	firstDayOfWeek: state.app.firstDayOfWeek,
	entries: state.file.entries,
	entryIdSelected: state.diary.entryIdSelected,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	setDateSelected: (date: Moment): SetDateSelectedAction => dispatch(setDateSelected(date)),
	selectEntry: (id: string): SetEntrySelectedAction => dispatch(setEntrySelected(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
