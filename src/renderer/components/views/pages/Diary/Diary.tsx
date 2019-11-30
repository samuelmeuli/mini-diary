import React, { FunctionComponent } from "react";

import SidebarContainer from "../../../elements/Calendar/SidebarContainer";
import EditorContainer from "../../../elements/Editor/EditorContainer";

const Diary: FunctionComponent<{}> = (): JSX.Element => (
	<div className="diary">
		<SidebarContainer />
		<EditorContainer />
	</div>
);

export default Diary;
