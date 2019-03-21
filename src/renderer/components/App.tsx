import { remote } from "electron";
import React, { Component } from "react";

import { toggleWindowSize } from "../electron/ipcRenderer/senders";
import { translations } from "../utils/i18n";
import ThemeContext from "./ThemeContext";
import ImportOverlayContainer from "./views/overlays/ImportOverlay/ImportOverlayContainer";
import Preferences from "./views/overlays/Preferences/PreferencesContainer";
import Diary from "./views/pages/Diary/Diary";
import PasswordCreationContainer from "./views/pages/PasswordCreation/PasswordCreationContainer";
import PasswordPromptContainer from "./views/pages/PasswordPrompt/PasswordPromptContainer";

export interface StateProps {
	exportErrorMsg: string;
	exportStatus: Status;
	fileExists: boolean;
	hashedPassword: string;
	importErrorMsg: string;
	importStatus: Status;
	showImportOverlay: boolean;
	showPref: boolean;
	theme: Theme;
}

export interface DispatchProps {
	testFileExists: () => void;
}

type Props = StateProps & DispatchProps;

interface State {
	isLoading: boolean;
}

export default class App extends Component<Props, State> {
	static hideSpinningCursor(): void {
		document.body.style.cursor = "auto";
	}

	static showSpinningCursor(): void {
		document.body.style.cursor = "wait";
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true,
		};
	}

	componentDidMount(): void {
		const { testFileExists } = this.props;

		testFileExists();
		this.setState({
			isLoading: false,
		});
	}

	componentDidUpdate(prevProps: Props): void {
		const { exportErrorMsg, exportStatus, importErrorMsg, importStatus } = this.props;

		// Check for export error and display it if there is one
		if (exportErrorMsg && exportErrorMsg !== prevProps.exportErrorMsg) {
			remote.dialog.showErrorBox(
				"export-error-title",
				`${translations["export-error-msg"]}: ${exportErrorMsg}`,
			);
		}

		// Check for import error and display it if there is one
		if (importErrorMsg && importErrorMsg !== prevProps.importErrorMsg) {
			remote.dialog.showErrorBox(
				"import-error-title",
				`${translations["import-error-msg"]}: ${importErrorMsg}`,
			);
		}

		// Show loading spinner if necessary
		if (exportStatus !== prevProps.exportStatus) {
			if (exportStatus === "inProgress") {
				App.showSpinningCursor();
			} else {
				App.hideSpinningCursor();
			}
		}
		if (importStatus !== prevProps.importStatus) {
			if (importStatus === "inProgress") {
				App.showSpinningCursor();
			} else {
				App.hideSpinningCursor();
			}
		}
	}

	render(): React.ReactNode {
		const { fileExists, hashedPassword, showImportOverlay, showPref, theme } = this.props;
		const { isLoading } = this.state;

		// Render app page
		let page;
		if (isLoading === true) {
			// Looking for diary file
			page = <p>{`${translations.loading}…`}</p>;
		} else if (fileExists === false) {
			// Diary file has not yet been created
			page = <PasswordCreationContainer />;
		} else if (hashedPassword === "") {
			// Diary is locked
			page = <PasswordPromptContainer />;
		} else {
			// Diary is unlocked
			page = <Diary />;
		}

		// Render overlay (e.g. preferences or import dialog) over page if necessary
		let overlay;
		if (showPref) {
			overlay = <Preferences />;
		} else if (showImportOverlay) {
			overlay = <ImportOverlayContainer />;
		}

		return (
			<ThemeContext.Provider value={theme}>
				<div className={`app theme-${theme}`}>
					<header onDoubleClick={toggleWindowSize} />
					{page}
					{overlay}
				</div>
			</ThemeContext.Provider>
		);
	}
}
