import React from 'react';

import CalendarContainer from '../../elements/Calendar/CalendarContainer';
import EditorContainer from '../../elements/Editor/EditorContainer';


export default function Diary() {
	return (
		<div className="diary">
			<CalendarContainer />
			<EditorContainer />
		</div>
	);
}
