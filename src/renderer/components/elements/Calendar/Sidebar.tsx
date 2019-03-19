import React, { PureComponent } from "react";

import CalendarContainer from "./CalendarView/CalendarContainer";
import SearchContainer from "./SearchView/SearchContainer";
import ToolbarContainer from "./ToolbarContainer";

interface Props {
	searchKey: string;
}

export default class Sidebar extends PureComponent<Props, {}> {
	render() {
		const { searchKey } = this.props;
		return (
			<div className="sidebar">
				<ToolbarContainer />
				{searchKey === "" ? <CalendarContainer /> : <SearchContainer />}
			</div>
		);
	}
}
