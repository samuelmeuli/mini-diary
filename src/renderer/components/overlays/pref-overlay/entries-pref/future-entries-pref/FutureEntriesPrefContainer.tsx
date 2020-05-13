import { connect } from "react-redux";

import { updateFutureEntriesPref } from "../../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import FutureEntriesPref, { DispatchProps, StateProps } from "./FutureEntriesPref";

const mapStateToProps = (state: RootState): StateProps => ({
	allowFutureEntries: state.app.allowFutureEntries,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateFutureEntriesPref: (allowFutureEntries: boolean): void =>
		dispatch(updateFutureEntriesPref(allowFutureEntries)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEntriesPref);
