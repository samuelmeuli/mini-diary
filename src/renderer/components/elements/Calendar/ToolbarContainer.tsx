import { connect } from "react-redux";

import { search, setDateSelected } from "../../../store/diary/actionCreators";
import { RootState, ThunkDispatchT } from "../../../store/store";
import Toolbar from "./Toolbar";

function mapStateToProps(state: RootState) {
	return {
		dateSelected: state.diary.dateSelected,
		monthSelected: state.diary.monthSelected,
		searchKey: state.diary.searchKey,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatchT) {
	return {
		search: (searchKey: string) => dispatch(search(searchKey)),
		setDateSelected: (date: Date) => dispatch(setDateSelected(date)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Toolbar);
