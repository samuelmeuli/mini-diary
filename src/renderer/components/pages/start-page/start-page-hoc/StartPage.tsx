import React, { FunctionComponent, ReactNode } from "react";

import appIcon from "../../../../assets/icons/app-icon.png";

interface Props {
	children: ReactNode;
}

const StartPage: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<img src={appIcon} alt="App icon" className="app-icon" width={140} height={140} />
				<div className="page-centered-content">{children}</div>
			</div>
		</div>
	);
};

export default StartPage;
