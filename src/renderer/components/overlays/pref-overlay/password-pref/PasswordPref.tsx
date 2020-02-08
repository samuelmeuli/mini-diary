import React, { ChangeEvent, ReactElement, useState } from "react";

import { translations } from "../../../../utils/i18n";
import Banner from "../../../elements/general/banner/Banner";

export interface DispatchProps {
	updatePassword: (newPassword: string) => void;
}

type Props = DispatchProps;

/**
 * Preference fieldset for updating the current diary's password
 */
export default function PasswordPref(props: Props): ReactElement {
	const { updatePassword } = props;

	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const onPassword1Change = (e: ChangeEvent<HTMLInputElement>): void =>
		setPassword1(e.target.value);

	const onPassword2Change = (e: ChangeEvent<HTMLInputElement>): void =>
		setPassword2(e.target.value);

	const onClick = (): void => {
		if (password1 === password2) {
			updatePassword(password1);
			setPassword1("");
			setPassword2("");
		} else {
			throw Error(translations["passwords-no-match"]);
		}
	};

	const passwordsMatch = password1 === password2;

	return (
		<fieldset className="fieldset-password">
			<legend>{translations.password}</legend>
			<div className="fieldset-content">
				<input
					type="password"
					value={password1}
					placeholder={translations["new-password"]}
					required
					onChange={onPassword1Change}
				/>
				<input
					type="password"
					value={password2}
					placeholder={translations["repeat-new-password"]}
					required
					onChange={onPassword2Change}
				/>
				<button
					type="button"
					disabled={!password1 || !password2 || !passwordsMatch}
					onClick={onClick}
					className="button button-main"
				>
					{translations["change-password"]}
				</button>
			</div>
			<div className="password-update-banner">
				{password1 && password2 && !passwordsMatch && (
					<Banner bannerType="error" message={translations["passwords-no-match"]} />
				)}
			</div>
		</fieldset>
	);
}
