import React from 'react';
import PropTypes from 'prop-types';

import appIcon from '../../assets/images/app-icon.svg';


const propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default function PageCentered(props) {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<img src={appIcon} alt="App icon" className="app-icon" width={100} height={100} />
				<div className="page-centered-content">
					{children}
				</div>
			</div>
		</div>
	);
}

PageCentered.propTypes = propTypes;
