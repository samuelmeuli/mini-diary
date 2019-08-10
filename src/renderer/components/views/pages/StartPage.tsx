import React, { FunctionComponent, ReactNode } from "react";

import AppIcon from "../../../assets/icons/app-icon.svg";

interface Props {
	children: ReactNode;
}

const StartPage: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<AppIcon className="app-icon" width={140} height={140} />
				<div className="page-centered-content">{children}</div>
			</div>
		</div>
	);
};

export default StartPage;
