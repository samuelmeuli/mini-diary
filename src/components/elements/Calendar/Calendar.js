import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GridViewContainer from './GridView/GridViewContainer';
import ViewSelectorContainer from './ViewSelectorContainer';


const propTypes = {
	view: PropTypes.string.isRequired
};

export default class Calendar extends PureComponent {
	render() {
		const { view } = this.props;
		return (
			<div className="calendar">
				<ViewSelectorContainer />
				{
					view === 'grid'
						? <GridViewContainer />
						: <p>TODO list view</p>
				}
			</div>
		);
	}
}

Calendar.propTypes = propTypes;
