import React from 'react';

import EditorContainer from '../../../elements/Editor/EditorContainer';
import SidebarContainer from '../../../elements/Calendar/SidebarContainer';


export default function Diary() {
	return (
		<div className="diary">
			<SidebarContainer />
			<EditorContainer />
		</div>
	);
}
