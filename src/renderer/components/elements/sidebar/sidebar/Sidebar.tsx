import React, { PureComponent, ReactNode } from "react";

import CalendarContainer from "../calendar/CalendarContainer";
import SearchBarContainer from "../search-bar/SearchBarContainer";
import SearchResultsContainer from "../search-results/SearchResultsContainer";

export interface StateProps {
	searchKey: string;
}

type Props = StateProps;

export default class Sidebar extends PureComponent<Props, {}> {
	render(): ReactNode {
		const { searchKey } = this.props;
		return (
			<div className="sidebar">
				<SearchBarContainer />
				{searchKey === "" ? <CalendarContainer /> : <SearchResultsContainer />}
			</div>
		);
	}
}
