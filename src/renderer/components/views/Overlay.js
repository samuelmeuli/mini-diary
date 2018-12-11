import React from 'react';
import PropTypes from 'prop-types';
import iconClear from 'feather-icons/dist/icons/x.svg';
import SimpleSvg from 'react-simple-svg';


const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	onClose: PropTypes.func.isRequired
};

export default function Overlay(props) {
	const { children, onClose } = props;
	return (
		<div className="overlay-outer">
			<div className="overlay-inner">
				<button
					type="button"
					className="button button-invisible overlay-close-button"
					onClick={onClose}
				>
					<SimpleSvg src={iconClear} height={20} width={20} />
				</button>
				<div className="overlay-content">
					{children}
				</div>
			</div>
		</div>
	);
}

Overlay.propTypes = propTypes;
