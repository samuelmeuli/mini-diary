import React, { ReactElement } from "react";

import { ThemePref } from "../../../../types";
import { translations } from "../../../../utils/i18n";
import { supportsNativeTheme } from "../../../../utils/native-theme";

export interface StateProps {
	themePref: ThemePref;
}

export interface DispatchProps {
	updateThemePref: (themePref: ThemePref) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for updating the app's theme
 */
export default function ThemePrefComponent(props: Props): ReactElement {
	const { themePref, updateThemePref } = props;

	const setThemePrefAuto = (): void => updateThemePref("auto");
	const setThemePrefDark = (): void => updateThemePref("dark");
	const setThemePrefLight = (): void => updateThemePref("light");

	return (
		<fieldset className="fieldset-theme">
			<legend>{translations.theme}</legend>
			<div className="fieldset-content">
				<div className="form-group">
					{/* Display "Auto" option if Electron supports theme detection for current OS */}
					{supportsNativeTheme() && (
						<label htmlFor="radio-theme-auto">
							<input
								type="radio"
								name="radio-theme-auto"
								id="radio-theme-auto"
								checked={themePref === "auto"}
								onChange={setThemePrefAuto}
							/>
							{translations.auto}
						</label>
					)}
					<label htmlFor="radio-theme-light">
						<input
							type="radio"
							name="radio-theme-light"
							id="radio-theme-light"
							checked={themePref === "light"}
							onChange={setThemePrefLight}
						/>
						{translations.light}
					</label>
					<label htmlFor="radio-theme-dark">
						<input
							type="radio"
							name="radio-theme-dark"
							id="radio-theme-dark"
							checked={themePref === "dark"}
							onChange={setThemePrefDark}
						/>
						{translations.dark}
					</label>
				</div>
			</div>
		</fieldset>
	);
}
