import { remote } from "electron";

import logger from "electron-log";
import React, { PureComponent, ReactNode } from "react";

import { ImportFormat } from "../../../types";
import { translate, translations } from "../../../utils/i18n";
import OverlayContainer from "../overlay-hoc/OverlayContainer";

const appName = remote.app.name;
const fields = {
	jsonDayOne: {
		title: translate("import-from-format", { format: "JSON (Day One)" }),
		extension: "json",
		instructions: <p>{translate("import-instructions-day-one", { appName, format: "JSON" })}</p>,
	},
	jsonJrnl: {
		title: translate("import-from-format", { format: "JSON (jrnl)" }),
		extension: "json",
		instructions: (
			<p>
				{translate("import-instructions-jrnl", { appName }).split(/{.*?}/)[0]}
				<code>jrnl --export json -o jrnl-export.json</code>
				{translate("import-instructions-jrnl", { appName }).split(/{.*?}/)[1]}
			</p>
		),
	},
	jsonMiniDiary: {
		title: translate("import-from-format", { format: "JSON (Mini Diary)" }),
		extension: "json",
		instructions: <p>{translate("import-instructions-mini-diary", { appName })}</p>,
	},
	txtDayOne: {
		title: translate("import-from-format", { format: "TXT (Day One)" }),
		extension: "txt",
		instructions: (
			<p>{translate("import-instructions-day-one", { appName, format: "Plain Text" })}</p>
		),
	},
};

export interface StateProps {
	importFormat: ImportFormat;
}

export interface DispatchProps {
	runImport: (importFilePath: string) => void;
}

type Props = StateProps & DispatchProps;

export default class ImportOverlay extends PureComponent<Props, {}> {
	static showImportFormatError(): void {
		const errMsg = "No import format selected";
		logger.error(`Error importing diary file: ${errMsg}`);
		remote.dialog.showErrorBox(translations["import-error-title"], errMsg);
	}

	constructor(props: Props) {
		super(props);

		// Function bindings
		this.selectAndImportFile = this.selectAndImportFile.bind(this);
	}

	async selectAndImportFile(): Promise<void> {
		const { importFormat, runImport } = this.props;

		if (!importFormat) {
			ImportOverlay.showImportFormatError();
			return;
		}

		// Show dialog for selecting file to import
		const { filePaths } = await remote.dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [
				{
					name: fields[importFormat].extension.toUpperCase(),
					extensions: [fields[importFormat].extension],
				},
			],
		});

		if (filePaths && filePaths.length === 1) {
			runImport(filePaths[0]);
		}
	}

	render(): ReactNode {
		const { importFormat } = this.props;

		if (!importFormat) {
			ImportOverlay.showImportFormatError();
			return null;
		}

		return (
			<OverlayContainer className="import-overlay">
				<h1>{fields[importFormat].title}</h1>
				{fields[importFormat].instructions}
				<button type="button" className="button button-main" onClick={this.selectAndImportFile}>
					{translations["start-import"]}
				</button>
			</OverlayContainer>
		);
	}
}
