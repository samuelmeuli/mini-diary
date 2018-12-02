import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import SimpleSvg from 'react-simple-svg';
import iconToday from '../../../assets/icons/today.svg';


const propTypes = {
	search: PropTypes.func.isRequired,
	searchKey: PropTypes.string.isRequired,
	setDateSelected: PropTypes.func.isRequired
};

export default class Toolbar extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			newSearchKey: props.searchKey
		};

		// Function bindings
		this.onChange = this.onChange.bind(this);
		this.onTodaySelection = this.onTodaySelection.bind(this);
		this.updateSearchKey = this.updateSearchKey.bind(this);
		this.updateSearchKeyDebounced = debounce(this.updateSearchKey, 500);
	}

	onChange(e) {
		const newSearchKey = e.target.value;
		this.setState({
			newSearchKey
		});
		if (newSearchKey === '') {
			this.updateSearchKey(newSearchKey);
		}
		this.updateSearchKeyDebounced(newSearchKey);
	}

	onTodaySelection() {
		const { setDateSelected } = this.props;
		const today = new Date();
		setDateSelected(today);
	}

	updateSearchKey(newSearchKey) {
		const { search } = this.props;
		search(newSearchKey);
	}

	render() {
		const { newSearchKey } = this.state;
		return (
			<div className="view-selector">
				<input
					type="search"
					placeholder="Search…"
					value={newSearchKey}
					onChange={this.onChange}
				/>
				<button
					type="button"
					className="button button-invisible button-today"
					onClick={this.onTodaySelection}
				>
					<SimpleSvg src={iconToday} title="Today" height={20} width={20} />
				</button>
			</div>
		);
	}
}

Toolbar.propTypes = propTypes;
