import { connect } from "react-redux";

import { RootState } from "../../../store/store";
import Sidebar from "./Sidebar";

function mapStateToProps(state: RootState) {
	return {
		searchKey: state.diary.searchKey,
	};
}

export default connect(mapStateToProps)(Sidebar);
