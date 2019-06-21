import React, { PureComponent, ReactNode } from "react";

import CalendarContainer from "./CalendarView/CalendarContainer";
import SearchContainer from "./SearchView/SearchContainer";
import ToolbarContainer from "./ToolbarContainer";

export interface StateProps {
	searchKey: string;
}

type Props = StateProps;

export default class Sidebar extends PureComponent<Props, {}> {
	render(): ReactNode {
		const { searchKey } = this.props;
		return (
			<div className="sidebar">
				<ToolbarContainer />
				{searchKey === "" ? <CalendarContainer /> : <SearchContainer />}
			</div>
		);
	}
}
