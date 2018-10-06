import React from 'react';

import CalendarContainer from '../../elements/CalendarContainer';
import EditorContainer from '../../elements/EditorContainer';


export default function Diary() {
	return (
		<div className="diary">
			<CalendarContainer />
			<EditorContainer />
		</div>
	);
}
