import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SimpleSvg from 'react-simple-svg';
import iconList from '../../../assets/icons/list-view.svg';
import iconGrid from '../../../assets/icons/grid-view.svg';
import iconToday from '../../../assets/icons/today.svg';


const propTypes = {
	setDate: PropTypes.func.isRequired,
	setView: PropTypes.func.isRequired,
	view: PropTypes.string.isRequired
};

export default class ViewSelector extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.onTodaySelection = this.onTodaySelection.bind(this);
	}

	onTodaySelection() {
		const { setDate } = this.props;
		const today = new Date();
		setDate(today);
	}

	render() {
		const { setView, view } = this.props;
		return (
			<div className="view-selector">
				<div>
					<button
						type="button"
						className="button-invisible"
						onClick={() => setView('grid')}
						disabled={view === 'grid'}
					>
						<SimpleSvg src={iconGrid} title="Grid view" height={20} width={20} />
					</button>
					<button
						type="button"
						className="button-invisible"
						onClick={() => setView('list')}
						disabled={view === 'list'}
					>
						<SimpleSvg src={iconList} title="List view" height={20} width={20} />
					</button>
				</div>
				<button
					type="button"
					className="button-invisible button-today"
					onClick={this.onTodaySelection}
				>
					<SimpleSvg src={iconToday} title="Today" height={20} width={20} />
				</button>
			</div>
		);
	}
}

ViewSelector.propTypes = propTypes;
