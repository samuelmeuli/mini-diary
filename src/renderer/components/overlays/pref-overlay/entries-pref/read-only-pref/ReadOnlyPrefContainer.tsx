import { connect } from "react-redux";

import { updateReadOnlyPref } from "../../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import ReadOnlyPref, { DispatchProps, StateProps } from "./ReadOnlyPref";

const mapStateToProps = (state: RootState): StateProps => ({
	readOnly: state.app.readOnly,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateReadOnlyPref: (readOnly: boolean): void =>
		dispatch(updateReadOnlyPref(readOnly)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyPref);
