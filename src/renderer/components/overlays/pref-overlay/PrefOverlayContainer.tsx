import { connect } from "react-redux";

import { RootState } from "../../../store/store";
import PrefOverlay, { StateProps } from "./PrefOverlay";

const mapStateToProps = (state: RootState): StateProps => ({
	hashedPassword: state.file.hashedPassword,
});

export default connect(mapStateToProps)(PrefOverlay);
