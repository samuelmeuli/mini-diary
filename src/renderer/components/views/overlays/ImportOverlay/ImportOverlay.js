import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';

const { dialog } = window.require('electron').remote;


const FIELDS = {
	dayOne: {
		name: 'Day One',
		extension: 'txt',
		instructions: (
			<p>
				Open the Day One app and export your diary under File → Export → Plain Text. Unzip the
				created file. Select the resulting TXT file in the next step to import it into Mini Diary.
			</p>
		)
	},
	jrnl: {
		name: 'jrnl',
		extension: 'json',
		instructions: (
			<p>
				To export your jrnl diary, run <code>jrnl --export json -o jrnl-export.json</code>. Select
				the created JSON file in the next step to import it into Mini Diary.
			</p>
		)
	},
	json: {
		name: 'JSON',
		extension: 'json',
		instructions: (
			<p>
				You can import your data from a previous Mini Diary JSON export or from another JSON file
				that is formatted the same way.
			</p>
		)
	}
};

const propTypes = {
	hideImportOverlay: PropTypes.func.isRequired,
	importFormat: PropTypes.oneOf(['dayOne', 'jrnl', 'json']).isRequired,
	runImport: PropTypes.func.isRequired
};

export default class ImportOverlay extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.selectAndImportFile = this.selectAndImportFile.bind(this);
	}

	selectAndImportFile() {
		const { importFormat, runImport } = this.props;

		// Show dialog for selecting file to import
		const fileNameArray = dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{
				name: `${FIELDS[importFormat].extension.toUpperCase()} file`,
				extensions: [FIELDS[importFormat].extension]
			}]
		});

		// Run import if exactly one file has been selected
		if (fileNameArray && fileNameArray.length === 1) {
			runImport(fileNameArray[0]);
		}
	}

	render() {
		const { hideImportOverlay, importFormat } = this.props;

		return (
			<Overlay className="import-overlay" onClose={hideImportOverlay}>
				<h1>Import from {FIELDS[importFormat].name}</h1>
				{FIELDS[importFormat].instructions}
				<p>Mini Diary will create a backup of your data before the import.</p>
				<button type="button" className="button button-main" onClick={this.selectAndImportFile}>
					Start import
				</button>
			</Overlay>
		);
	}
}

ImportOverlay.propTypes = propTypes;
