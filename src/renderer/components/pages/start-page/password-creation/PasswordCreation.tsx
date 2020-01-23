import React, { ChangeEvent, FormEvent, PureComponent, ReactNode } from "react";

import { translations } from "../../../../utils/i18n";
import Banner from "../../../elements/general/banner/Banner";
import StartPage from "../start-page-hoc/StartPage";

export interface DispatchProps {
	createEncryptedFile: (password: string) => void;
	testFileExists: () => void;
}

type Props = DispatchProps;

interface State {
	password1: string;
	password2: string;
}

export default class PasswordCreation extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			password1: "",
			password2: "",
		};

		// Function bindings
		this.onChangePassword1 = this.onChangePassword1.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangePassword1(e: ChangeEvent<HTMLInputElement>): void {
		const password1 = e.target.value;

		this.setState({
			password1,
		});
	}

	onChangePassword2(e: ChangeEvent<HTMLInputElement>): void {
		const password2 = e.target.value;

		this.setState({
			password2,
		});
	}

	onSubmit(e: FormEvent): void {
		e.preventDefault();
		const { createEncryptedFile, testFileExists } = this.props;
		const { password1, password2 } = this.state;

		if (password1 === password2) {
			createEncryptedFile(password1);
			testFileExists();
		} else {
			throw Error(translations["passwords-no-match"]);
		}
	}

	render(): ReactNode {
		const { password1, password2 } = this.state;

		const passwordsMatch = password1 === password2;

		return (
			<StartPage>
				<p>{translations["choose-password"]}</p>
				<form className="password-creation-form" onSubmit={this.onSubmit}>
					<input
						type="password"
						value={password1}
						placeholder={translations.password}
						autoFocus // eslint-disable-line jsx-a11y/no-autofocus
						required
						onChange={this.onChangePassword1}
					/>
					<input
						type="password"
						value={password2}
						placeholder={translations["repeat-password"]}
						required
						onChange={this.onChangePassword2}
					/>
					<button
						type="submit"
						disabled={!password1 || !password2 || !passwordsMatch}
						className="button button-main"
					>
						{translations["set-password"]}
					</button>
				</form>
				<div className="password-creation-banner">
					{password1 && password2 && !passwordsMatch && (
						<Banner bannerType="error" message={translations["passwords-no-match"]} />
					)}
				</div>
			</StartPage>
		);
	}
}
