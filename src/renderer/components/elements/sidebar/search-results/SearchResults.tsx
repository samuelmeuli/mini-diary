import { Moment } from "moment-timezone";
import React, { PureComponent, ReactNode } from "react";

import { Entries } from "../../../../types";
import { fromIndexDate } from "../../../../utils/dateFormat";
import { translations } from "../../../../utils/i18n";
import { SearchResult } from "../../../../utils/searchIndex";
import Banner from "../../general/banner/Banner";

export interface StateProps {
	entries: Entries;
	searchResults: SearchResult[];
	entryIdSelected: string | null;
}

export interface DispatchProps {
	setEntrySelected: (id: string, date: Moment) => void;
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
		const { entries, searchResults, setEntrySelected, entryIdSelected } = this.props;
		return searchResults.reduce((r: ReactNode[], searchResult): ReactNode[] => {
			const entry =
				entries[searchResult.indexDate] &&
				entries[searchResult.indexDate].find(e => e.id === searchResult.id);
			if (entry) {
				// Create search result element if a corresponding diary entry exists
				// (When deleting a diary entry after a search, it is still part of the search results
				// until a new search is performed. That's why it needs to be filtered out here)
				const date = fromIndexDate(searchResult.indexDate);
				const { title } = entry;
				const isSelected = searchResult.id === entryIdSelected;
				r.push(
					<li key={searchResult.id} className="search-result">
						<button
							type="button"
							className={`button ${isSelected ? "button-main" : ""}`}
							onClick={(): void => setEntrySelected(searchResult.id, date)}
						>
							<p className="search-date text-faded">{searchResult.indexDate}</p>
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
