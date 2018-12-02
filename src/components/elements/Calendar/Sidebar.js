import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CalendarContainer from './CalendarView/CalendarContainer';
import SearchContainer from './SearchView/SearchContainer';
import ToolbarContainer from './ToolbarContainer';


const propTypes = {
	searchKey: PropTypes.string.isRequired
};

export default class Sidebar extends PureComponent {
	render() {
		const { searchKey } = this.props;
		return (
			<div className="sidebar">
				<ToolbarContainer />
				{
					searchKey === ''
						? <CalendarContainer />
						: <SearchContainer />
				}
			</div>
		);
	}
}

Sidebar.propTypes = propTypes;
