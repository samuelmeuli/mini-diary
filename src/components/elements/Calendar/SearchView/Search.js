import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Banner from '../../Banner';


const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(PropTypes.shape({
		dateUpdated: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
	setDateSelected: PropTypes.func.isRequired
};

export default class Search extends PureComponent {
	render() {
		const { dateSelected, entries, searchResults, setDateSelected } = this.props;

		let resultsEl;
		if (searchResults.length === 0) {
			resultsEl = <Banner type="info" message="No results" className="banner-no-results" />;
		} else {
			resultsEl = searchResults.map((result) => {
				const dateFormatted = result.ref;
				const date = moment(dateFormatted);
				const dateText = date.format('D MMMM YYYY');
				const { title } = entries[dateFormatted];
				const isSelected = date.isSame(dateSelected, 'day');
				return (
					<li key={result.ref} className="search-result">
						<button
							type="button"
							className={`button ${isSelected ? 'button-main' : ''}`}
							onClick={() => setDateSelected(date.toDate())}
						>
							<p className="search-date text-faded">
								{dateText}
							</p>
							<p className="search-title">{title}</p>
						</button>
					</li>
				);
			});
		}

		return (
			<ul className="search-results">
				{resultsEl}
			</ul>
		);
	}
}

Search.propTypes = propTypes;
