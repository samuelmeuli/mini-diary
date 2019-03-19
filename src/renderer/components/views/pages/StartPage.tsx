import React, { FunctionComponent, ReactNode } from "react";
import SimpleSvg from "react-simple-svg";

import appIcon from "../../../assets/icons/app-icon.svg";

interface Props {
	children: ReactNode;
}

const StartPage: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<SimpleSvg src={appIcon} className="app-icon" width={140} height={140} />
				<div className="page-centered-content">{children}</div>
			</div>
		</div>
	);
};

export default StartPage;
