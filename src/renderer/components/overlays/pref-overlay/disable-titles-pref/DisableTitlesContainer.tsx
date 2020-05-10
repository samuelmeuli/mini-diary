import { connect } from "react-redux";

import { updateDisableTitlesPref } from "../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import DisableTitlesPref, { DispatchProps, StateProps } from "./DisableTitlesPref";

const mapStateToProps = (state: RootState): StateProps => ({
	disableTitles: state.app.disableTitles,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateDisableTitlesPref: (disableTitles: boolean): void =>
		dispatch(updateDisableTitlesPref(disableTitles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisableTitlesPref);
