import { remote } from "electron";
import React, { PureComponent, ReactNode } from "react";

import { translate, translations } from "../../../../utils/i18n";
import Overlay from "../Overlay";

const APP_NAME = remote.app.getName();
const fields = {
	jsonDayOne: {
		title: translate("import-from-format", { format: "JSON (Day One)" }),
		extension: "json",
		instructions: (
			<p>{translate("import-instructions-day-one", { appName: APP_NAME, format: "JSON" })}</p>
		),
	},
	jsonJrnl: {
		title: translate("import-from-format", { format: "JSON (jrnl)" }),
		extension: "json",
		instructions: (
			<p>
				{translate("import-instructions-jrnl", { appName: APP_NAME }).split(/{.*?}/)[0]}
				<code>jrnl --export json -o jrnl-export.json</code>
				{translate("import-instructions-jrnl", { appName: APP_NAME }).split(/{.*?}/)[1]}
			</p>
		),
	},
	jsonMiniDiary: {
		title: translate("import-from-format", { format: "JSON (Mini Diary)" }),
		extension: "json",
		instructions: <p>{translate("import-instructions-mini-diary", { appName: APP_NAME })}</p>,
	},
	txtDayOne: {
		title: translate("import-from-format", { format: "TXT (Day One)" }),
		extension: "txt",
		instructions: (
			<p>{translate("import-instructions-day-one", { appName: APP_NAME, format: "Plain Text" })}</p>
		),
	},
};

export interface StateProps {
	importFormat: ImportFormat | null;
}

export interface DispatchProps {
	hideImportOverlay: () => void;
	runImport: (importFilePath: string) => void;
}

type Props = StateProps & DispatchProps;

export default class ImportOverlay extends PureComponent<Props, {}> {
	static showImportFormatError(): void {
		remote.dialog.showErrorBox(translations["import-error-title"], "No import format selected");
	}

	constructor(props: Props) {
		super(props);

		// Function bindings
		this.selectAndImportFile = this.selectAndImportFile.bind(this);
	}

	selectAndImportFile(): void {
		const { importFormat, runImport } = this.props;

		if (!importFormat) {
			ImportOverlay.showImportFormatError();
			return;
		}

		// Show dialog for selecting file to import
		const fileNameArray = remote.dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [
				{
					name: fields[importFormat].extension.toUpperCase(),
					extensions: [fields[importFormat].extension],
				},
			],
		});

		// Run import if exactly one file has been selected
		if (fileNameArray && fileNameArray.length === 1) {
			runImport(fileNameArray[0]);
		}
	}

	render(): ReactNode {
		const { hideImportOverlay, importFormat } = this.props;

		if (!importFormat) {
			ImportOverlay.showImportFormatError();
			return null;
		}

		return (
			<Overlay className="import-overlay" onClose={hideImportOverlay}>
				<h1>{fields[importFormat].title}</h1>
				{fields[importFormat].instructions}
				<button type="button" className="button button-main" onClick={this.selectAndImportFile}>
					{translations["start-import"]}
				</button>
			</Overlay>
		);
	}
}
