import { Moment } from "moment-timezone";
import { connect } from "react-redux";

import { search, setDateSelected } from "../../../../store/diary/actionCreators";
import { SetDateSelectedAction } from "../../../../store/diary/types";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import SearchBar, { DispatchProps, StateProps } from "./SearchBar";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	searchKey: state.diary.searchKey,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	search: (searchKey: string): void => dispatch(search(searchKey)),
	setDateSelected: (date: Moment): SetDateSelectedAction => dispatch(setDateSelected(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
