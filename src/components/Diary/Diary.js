import React from 'react';

import CalendarContainer from './CalendarContainer';
import EditorContainer from './EditorContainer';


export default function Diary() {
	return (
		<div>
			<button type="submit">
				TODO Lock
			</button>
			<CalendarContainer />
			<EditorContainer />
		</div>
	);
}
