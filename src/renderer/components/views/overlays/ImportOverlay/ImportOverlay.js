import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { translate, translations } from '../../../../helpers/i18n';
import Overlay from '../Overlay';

const { app, dialog } = require('electron').remote;

const APP_NAME = app.getName();
const tBackupInfo = translate('import-backup-info', { appName: APP_NAME });
const fields = {
	dayOne: {
		title: translate('import-from-format', { format: 'Day One' }),
		extension: 'txt',
		instructions: <p>{translate('import-instructions-day-one', { appName: APP_NAME })}</p>
	},
	jrnl: {
		title: translate('import-from-format', { format: 'jrnl' }),
		extension: 'json',
		instructions: (
			<p>
				{translate('import-instructions-jrnl', { appName: APP_NAME }).split(/{.*?}/)[0]}
				<code>jrnl --export json -o jrnl-export.json</code>
				{translate('import-instructions-jrnl', { appName: APP_NAME }).split(/{.*?}/)[1]}
			</p>
		)
	},
	json: {
		title: translate('import-from-format', { format: 'JSON' }),
		extension: 'json',
		instructions: <p>{translate('import-instructions-json', { appName: APP_NAME })}</p>
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
					name: fields[importFormat].extension.toUpperCase(),
					extensions: [fields[importFormat].extension]
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
				<h1>{fields[importFormat].title}</h1>
				{fields[importFormat].instructions}
				<p>{tBackupInfo}</p>
				<button type="button" className="button button-main" onClick={this.selectAndImportFile}>
					{translations['start-import']}
				</button>
			</Overlay>
		);
	}
}

ImportOverlay.propTypes = propTypes;
