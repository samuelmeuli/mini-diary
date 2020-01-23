import React, { PureComponent, ReactNode } from "react";

import { momentIndex, toDateString } from "../../../../utils/dateFormat";
import { translations } from "../../../../utils/i18n";
import Banner from "../../general/banner/Banner";

export interface StateProps {
	dateSelected: Date;
	entries: Entries;
	searchResults: string[];
}

export interface DispatchProps {
	setDateSelected: (date: Date) => void;
}

type Props = StateProps & DispatchProps;

export default class SearchResults extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.generateSearchResults = this.generateSearchResults.bind(this);
	}

	/**
	 * Generate list of search result elements
	 */
	generateSearchResults(): ReactNode[] {
		const { dateSelected, entries, searchResults, setDateSelected } = this.props;

		return searchResults.reduce((r: ReactNode[], searchResult): ReactNode[] => {
			if (searchResult in entries) {
				// Create search result element if a corresponding diary entry exists
				// (When deleting a diary entry after a search, it is still part of the search results
				// until a new search is performed. That's why it needs to be filtered out here)
				const date = momentIndex(searchResult);
				const { title } = entries[searchResult];
				const isSelected = date.isSame(dateSelected, "day");
				r.push(
					<li key={searchResult} className="search-result">
						<button
							type="button"
							className={`button ${isSelected ? "button-main" : ""}`}
							onClick={(): void => setDateSelected(date.toDate())}
						>
							<p className="search-date text-faded">{toDateString(date)}</p>
							<p className={`search-title ${!title ? "text-faded" : ""}`}>
								{title || translations["no-title"]}
							</p>
						</button>
					</li>,
				);
			}
			return r;
		}, []);
	}

	render(): ReactNode {
		const searchResultsEl = this.generateSearchResults();
		return (
			<ul className="search-results">
				{searchResultsEl.length === 0 ? (
					<Banner
						bannerType="info"
						message={translations["no-results"]}
						className="banner-no-results"
					/>
				) : (
					searchResultsEl
				)}
			</ul>
		);
	}
}
