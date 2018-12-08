import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';

import iconError from '../../assets/icons/error.svg';
import iconInfo from '../../assets/icons/info.svg';


const propTypes = {
	className: PropTypes.string,
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['error', 'info']).isRequired
};

const defaultProps = {
	className: ''
};

export default function Banner(props) {
	const { className, message, type } = props;

	return (
		<div className={`banner banner-${type} ${className}`}>
			<SimpleSvg src={type === 'error' ? iconError : iconInfo} height={20} width={20} />
			<p>{message}</p>
		</div>
	);
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;
