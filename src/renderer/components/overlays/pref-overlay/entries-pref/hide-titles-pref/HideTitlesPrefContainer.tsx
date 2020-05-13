import { connect } from "react-redux";

import { updateHideTitlesPref } from "../../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import HideTitlesPref, { DispatchProps, StateProps } from "./HideTitlesPref";

const mapStateToProps = (state: RootState): StateProps => ({
	hideTitles: state.app.hideTitles,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateHideTitlesPref: (hideTitles: boolean): void => dispatch(updateHideTitlesPref(hideTitles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HideTitlesPref);
