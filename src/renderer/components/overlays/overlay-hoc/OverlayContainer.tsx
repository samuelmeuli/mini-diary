import { connect } from "react-redux";

import { closeOverlay } from "../../../store/app/actionCreators";
import { SetOverlayAction } from "../../../store/app/types";
import { ThunkDispatchT } from "../../../store/store";
import Overlay, { DispatchProps } from "./Overlay";

const mapDispatchToProps = (dispatch: ThunkDispatchT): DispatchProps => ({
	closeOverlay: (): SetOverlayAction => dispatch(closeOverlay()),
});

export default connect(null, mapDispatchToProps)(Overlay);
