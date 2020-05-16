import { connect } from "react-redux";

import { updateDisableSpellCheckPref } from "../../../../../store/app/actionCreators";
import { RootState, ThunkDispatchT } from "../../../../../store/store";
import DisableSpellCheckPref, { DispatchProps, StateProps } from "./DisableSpellCheckPref";

const mapStateToProps = (state: RootState): StateProps => ({
	disableSpellCheck: state.app.disableSpellCheck,
});

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	updateDisableSpellCheckPref: (disableSpellCheck: boolean): void =>
		dispatch(updateDisableSpellCheckPref(disableSpellCheck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisableSpellCheckPref);
