import { connect } from 'react-redux';

import Sidebar from './Sidebar';


function mapStateToProps(state) {
	return {
		searchKey: state.diary.searchKey
	};
}

export default connect(mapStateToProps)(Sidebar);
