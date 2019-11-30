import { connect } from "react-redux";

import { search, setDateSelected } from "../../../store/diary/actionCreators";
import { SetDateSelectedAction } from "../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../store/store";
import Toolbar, { DispatchProps, StateProps } from "./Toolbar";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	monthSelected: state.diary.monthSelected,
	searchKey: state.diary.searchKey,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	search: (searchKey: string): void => dispatch(search(searchKey)),
	setDateSelected: (date: Date): SetDateSelectedAction => dispatch(setDateSelected(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
