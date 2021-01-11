import { connect } from "react-redux";

import { RootState } from "../../../../../store/store";
import WordCount, { StateProps } from "./WordCount";

const mapStateToProps = (state: RootState): StateProps => ({
	dateSelected: state.diary.dateSelected,
	entries: state.file.entries,
	entryIdSelected: state.diary.entryIdSelected,
});

export default connect(mapStateToProps)(WordCount);
