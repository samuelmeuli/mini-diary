import { remote } from "electron";

import React, { Component, ReactNode } from "react";

import { OverlayType } from "../../shared/types";
import { toggleWindowSize } from "../electron/window";
import { Status, Theme } from "../types";
import { translations } from "../utils/i18n";
import GoToDateOverlayContainer from "./overlays/go-to-date-overlay/GoToDateOverlayContainer";
import ImportOverlayContainer from "./overlays/import-overlay/ImportOverlayContainer";
import PrefOverlayContainer from "./overlays/pref-overlay/PrefOverlayContainer";
import StatsOverlayContainer from "./overlays/stats-overlay/StatsOverlayContainer";
import Diary from "./pages/diary/Diary";
import PasswordCreationContainer from "./pages/start-page/password-creation/PasswordCreationContainer";
import PasswordPromptContainer from "./pages/start-page/password-prompt/PasswordPromptContainer";
import ThemeContext from "./ThemeContext";

export interface StateProps {
	exportErrorMsg: string;
	exportStatus: Status;
	fileExists: boolean;
	hashedPassword: string;
	importErrorMsg: string;
	importStatus: Status;
	overlay: OverlayType;
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
	static createOverlayComp(overlay: OverlayType): ReactNode {
		switch (overlay) {
			case "none":
				return null;
			case "go-to-date":
				return <GoToDateOverlayContainer />;
			case "import":
				return <ImportOverlayContainer />;
			case "preferences":
				return <PrefOverlayContainer />;
			case "statistics":
				return <StatsOverlayContainer />;
			default:
				throw Error(`Cannot display overlay: Overlay type "${overlay}" does not exist`);
		}
	}

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
				translations["export-error-title"],
				`${translations["export-error-msg"]}: ${exportErrorMsg}`,
			);
		}

		// Check for import error and display it if there is one
		if (importErrorMsg && importErrorMsg !== prevProps.importErrorMsg) {
			remote.dialog.showErrorBox(
				translations["import-error-title"],
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

	render(): ReactNode {
		const { fileExists, hashedPassword, overlay, theme } = this.props;
		const { isLoading } = this.state;

		// Render app page
		let page;
		if (isLoading) {
			// Looking for diary file
			page = <p>{`${translations.loading}…`}</p>;
		} else if (!fileExists) {
			// Diary file has not yet been created
			page = <PasswordCreationContainer />;
		} else if (hashedPassword === "") {
			// Diary is locked
			page = <PasswordPromptContainer />;
		} else {
			// Diary is unlocked
			page = <Diary />;
		}

		const overlayComp = App.createOverlayComp(overlay);

		return (
			<ThemeContext.Provider value={theme}>
				{/* Everything below the "theme-*" div can be styled based on the theme */}
				<div className={`theme-${theme}`}>
					<div className="app">
						<header onDoubleClick={toggleWindowSize} />
						{page}
						{
							/* Render overlay (e.g. preferences or import dialog) over page if necessary */
							overlayComp
						}
					</div>
				</div>
			</ThemeContext.Provider>
		);
	}
}
