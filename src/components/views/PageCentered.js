import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';

import appIcon from '../../assets/icons/app-icon.svg';


const propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default function PageCentered(props) {
	const { children } = props;
	return (
		<div className="page-centered-outer">
			<div className="page-centered-inner">
				<SimpleSvg
					src={appIcon}
					className="app-icon"
					width={100}
					height={100}
				/>
				<div className="page-centered-content">
					{children}
				</div>
			</div>
		</div>
	);
}

PageCentered.propTypes = propTypes;
