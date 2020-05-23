import { connect } from "react-redux";

import { updateSpellcheckPref } from "../../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import SpellcheckPref, { DispatchProps, StateProps } from "./SpellcheckPref";

const mapStateToProps = (state: RootState): StateProps => ({
	enableSpellcheck: state.app.enableSpellcheck,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateSpellcheckPref: (enableSpellcheck: boolean): void =>
		dispatch(updateSpellcheckPref(enableSpellcheck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellcheckPref);
