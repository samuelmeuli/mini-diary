import React, { FunctionComponent } from "react";

import EditorContainer from "../../elements/editor/editor/EditorContainer";
import SidebarContainer from "../../elements/sidebar/sidebar/SidebarContainer";

const Diary: FunctionComponent<{}> = (): JSX.Element => (
	<div className="diary">
		<SidebarContainer />
		<EditorContainer />
	</div>
);

export default Diary;
