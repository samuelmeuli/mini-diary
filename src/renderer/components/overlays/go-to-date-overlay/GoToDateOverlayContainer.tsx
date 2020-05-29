import { Moment } from "moment-timezone";
import { connect } from "react-redux";

import { closeOverlay } from "../../../store/app/actionCreators";
import { SetOverlayAction } from "../../../store/app/types";
import { setDateSelected } from "../../../store/diary/actionCreators";
import { SetDateSelectedAction } from "../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../store/store";
import GoToDateOverlay, { DispatchProps, StateProps } from "./GoToDateOverlay";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
	dateSelected: state.diary.dateSelected,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	closeOverlay: (): SetOverlayAction => dispatch(closeOverlay()),
	setDateSelected: (date: Moment): SetDateSelectedAction => dispatch(setDateSelected(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoToDateOverlay);
