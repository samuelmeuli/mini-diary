import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';

import appIcon from '../../../assets/icons/app-icon.svg';


const propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default function StartPage(props) {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<SimpleSvg src={appIcon} className="app-icon" width={140} height={140} />
				<div className="page-centered-content">
					{children}
				</div>
			</div>
		</div>
	);
}

StartPage.propTypes = propTypes;
