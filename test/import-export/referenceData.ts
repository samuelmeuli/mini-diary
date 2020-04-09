/**
 * Reference data object (without dateUpdated fields) with rich-text formatting (Markdown)
 */
export const referenceDataMd = {
	"2019-01-01": {
		dateUpdated: "Thu Jan 03 2019 00:00:00 GMT-0800",
		title: "Diary Entry 1",
		text: "This text is **bold** and _italic_.",
	},
	"2019-01-02": {
		dateUpdated: "Thu Jan 03 2019 00:00:00 GMT-0800",
		title: "Diary Entry 2",
		text:
			"Here's a bulleted list:\n\n- One\n- Two\n- Three\n\nAnd here's a numbered list:\n\n1. One\n2. Two\n3. Three",
	},
};

/**
 * Reference data object (without dateUpdated fields) without rich-text formatting
 */
export const referenceDataTxt = {
	"2019-01-01": {
		dateUpdated: "Thu Jan 03 2019 00:00:00 GMT-0800",
		title: "Diary Entry 1",
		text: "This text is bold and italic.",
	},
	"2019-01-02": {
		dateUpdated: "Thu Jan 03 2019 00:00:00 GMT-0800",
		title: "Diary Entry 2",
		text:
			"Here's a bulleted list:\n\n- One\n- Two\n- Three\n\nAnd here's a numbered list:\n\n1. One\n2. Two\n3. Three",
	},
};
