import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import iconClear from 'feather-icons/dist/icons/x.svg';
import debounce from 'lodash.debounce';
import moment from 'moment';
import SimpleSvg from 'react-simple-svg';

import iconToday from '../../../assets/icons/today.svg';
import { t } from '../../../electron/ipcRenderer/senders';

const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	monthSelected: PropTypes.instanceOf(Date).isRequired,
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
		this.clearSearchKey = this.clearSearchKey.bind(this);
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

	clearSearchKey() {
		this.setState({
			newSearchKey: ''
		});
		this.updateSearchKey('');
	}

	updateSearchKey(newSearchKey) {
		const { search } = this.props;
		search(newSearchKey);
	}

	render() {
		const { dateSelected, monthSelected } = this.props;
		const { newSearchKey } = this.state;

		const today = moment();
		const isToday = moment(dateSelected).isSame(today, 'day');
		const isCurrentMonth = moment(monthSelected).isSame(today, 'month');

		return (
			<div className="view-selector">
				<div className="search-input-wrapper">
					<input
						type="search"
						className="search-input"
						placeholder={`${t('search')}…`}
						value={newSearchKey}
						onChange={this.onChange}
					/>
					{newSearchKey !== '' && (
						<span className="search-input-clear">
							<button
								type="button"
								className="button button-invisible"
								onClick={this.clearSearchKey}
							>
								<SimpleSvg src={iconClear} height={20} width={20} />
							</button>
						</span>
					)}
				</div>
				<button
					type="button"
					className="button button-invisible button-today"
					disabled={isToday && isCurrentMonth}
					onClick={this.onTodaySelection}
				>
					<SimpleSvg src={iconToday} title={t('today')} height={20} width={20} />
				</button>
			</div>
		);
	}
}

Toolbar.propTypes = propTypes;
