import { connect } from "react-redux";

import { updateThemePref } from "../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../store/store";
import { ThemePref } from "../../../../types";
import ThemePrefComponent, { DispatchProps, StateProps } from "./ThemePref";

const mapStateToProps = (state: RootState): StateProps => ({
	themePref: state.app.themePref,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateThemePref: (themePref: ThemePref): void => dispatch(updateThemePref(themePref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemePrefComponent);
