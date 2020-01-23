import { connect } from "react-redux";

import { RootState } from "../../../store/store";
import StatsOverlay, { StateProps } from "./StatsOverlay";

const mapStateToProps = (state: RootState): StateProps => ({
	entries: state.file.entries,
});

export default connect(mapStateToProps)(StatsOverlay);
