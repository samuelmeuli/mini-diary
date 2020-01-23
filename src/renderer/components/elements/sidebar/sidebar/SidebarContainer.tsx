import { connect } from "react-redux";

import { RootState } from "../../../../store/store";
import Sidebar, { StateProps } from "./Sidebar";

const mapStateToProps = (state: RootState): StateProps => ({
	searchKey: state.diary.searchKey,
});

export default connect(mapStateToProps)(Sidebar);
