import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Banner from '../../Banner';
import { toDateString } from '../../../../helpers/dateFormat';
import { translations } from '../../../../helpers/i18n';

const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(
		PropTypes.shape({
			dateUpdated: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})
	).isRequired,
	searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
	setDateSelected: PropTypes.func.isRequired
};

export default class Search extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.generateSearchResults = this.generateSearchResults.bind(this);
	}

	/**
	 * Generate list of search result elements
	 */
	generateSearchResults() {
		const { dateSelected, entries, searchResults, setDateSelected } = this.props;

		return searchResults.reduce((r, searchResult) => {
			if (searchResult.ref in entries) {
				// Create search result element if a corresponding diary entry exists
				// (When deleting a diary entry after a search, it is still part of the search results
				// until a new search is performed. That's why it needs to be filtered out here)
				const indexDate = searchResult.ref;
				const date = moment(indexDate);
				const dateText = toDateString(date);
				const { title } = entries[indexDate];
				const isSelected = date.isSame(dateSelected, 'day');
				r.push(
					<li key={searchResult.ref} className="search-result">
						<button
							type="button"
							className={`button ${isSelected ? 'button-main' : ''}`}
							onClick={() => setDateSelected(date.toDate())}
						>
							<p className="search-date text-faded">{dateText}</p>
							<p className={`search-title ${!title ? 'text-faded' : ''}`}>
								{title || translations['no-title']}
							</p>
						</button>
					</li>
				);
			}
			return r;
		}, []);
	}

	render() {
		const searchResultsEl = this.generateSearchResults();
		return (
			<ul className="search-results">
				{searchResultsEl.length === 0 ? (
					<Banner type="info" message={translations['no-results']} className="banner-no-results" />
				) : (
					searchResultsEl
				)}
			</ul>
		);
	}
}

Search.propTypes = propTypes;
