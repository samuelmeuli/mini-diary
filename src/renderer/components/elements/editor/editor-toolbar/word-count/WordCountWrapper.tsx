import { connect } from "react-redux";

import { RootState } from "../../../../../store/store";
import WordCount, { StateProps } from "./WordCount";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
});

export default connect(mapStateToProps)(WordCount);
