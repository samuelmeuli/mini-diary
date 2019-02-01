import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';
import { t } from '../../../../electron/ipcRenderer/senders';

const { dialog } = require('electron').remote;

const FIELDS = {
	dayOne: {
		title: `${t('import-from-format', { format: 'Day One' })}…`,
		extension: 'txt',
		instructions: <p>{t('import-instructions-day-one')}</p>
	},
	jrnl: {
		title: `${t('import-from-format', { format: 'jrnl' })}…`,
		extension: 'json',
		instructions: (
			<p>
				{t('import-instructions-jrnl').split(/{.*?}/)[0]}
				<code>jrnl --export json -o jrnl-export.json</code>
				{t('import-instructions-jrnl').split(/{.*?}/)[1]}
			</p>
		)
	},
	json: {
		title: `${t('import-from-format', { format: 'JSON' })}…`,
		extension: 'json',
		instructions: <p>{t('import-instructions-json')}</p>
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
			filters: [
				{
					name: FIELDS[importFormat].extension.toUpperCase(),
					extensions: [FIELDS[importFormat].extension]
				}
			]
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
				<h1>{FIELDS[importFormat].title}</h1>
				{FIELDS[importFormat].instructions}
				<p>{t('import-backup-info')}</p>
				<button type="button" className="button button-main" onClick={this.selectAndImportFile}>
					{t('start-import')}
				</button>
			</Overlay>
		);
	}
}

ImportOverlay.propTypes = propTypes;
