import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { toWeekdayDateString } from '../dateFormat';

// Currently required to make PDF generation work
// Related issue: https://github.com/bpampuch/pdfmake/issues/864#issuecomment-298341323
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DOC_CONFIG = {
	defaultStyle: {
		fontSize: 12,
		lineHeight: 1.3
	},
	pageMargins: 60,
	pageSize: 'A4'
};

function h1(text) {
	return {
		text,
		fontSize: 24,
		bold: true
	};
}

function h2(text) {
	return {
		text,
		fontSize: 16,
		bold: true,
		margin: [0, 16, 0, 6] // [left, top, right, bottom]
	};
}

function h3(text) {
	return {
		text,
		bold: true,
		margin: [0, 4, 0, 4]
	};
}

function p(text) {
	return {
		text,
		margin: [0, 4, 0, 4]
	};
}

/**
 * Fill the PDF document with the diary entries
 */
function buildPdfDoc(entries) {
	const content = [h1('Mini Diary')];

	entries.forEach(([indexDate, entry]) => {
		const { text, title } = entry;

		// Format date
		const dateStr = toWeekdayDateString(indexDate);

		// Build document
		content.push(h2(dateStr));
		if (title) {
			content.push(h3(title));
		}
		if (text) {
			content.push(p(text));
		}
	});

	return {
		...DOC_CONFIG,
		content
	};
}

/**
 * Convert entries to a PDF buffer
 */
export function convertToPdf(entries) {
	return new Promise(resolve => {
		// Build PDF
		const doc = buildPdfDoc(entries);
		const pdf = pdfMake.createPdf(doc);

		// Return PDF as Buffer
		pdf.getDataUrl(dataUrl => {
			const regex = /^data:.+\/.+;base64,(.*)$/;
			const matches = dataUrl.match(regex);
			const data = matches[1];
			const buffer = Buffer.from(data, 'base64');
			resolve(buffer);
		});
	});
}
