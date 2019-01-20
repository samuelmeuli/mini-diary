import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import iconClear from 'feather-icons/dist/icons/x.svg';
import SimpleSvg from 'react-simple-svg';


const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	className: PropTypes.string,
	onClose: PropTypes.func.isRequired
};

const defaultProps = {
	className: ''
};

export default class Overlay extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.onClick);
		window.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.onClick);
		window.removeEventListener('keydown', this.onKeyDown);
	}

	/**
	 * Close the overlay if the user clicks outside it
	 */
	onClick(e) {
		const { onClose } = this.props;
		let targetElement = e.target; // Clicked element

		do {
			if (targetElement === this.overlayElement) {
				// Click inside overlay
				return;
			}
			// Move up the DOM
			targetElement = targetElement.parentNode;
		} while (targetElement);

		// Click outside overlay
		onClose();
	}

	/**
	 * Close the overlay when the ESC key is pressed
	 */
	onKeyDown(e) {
		if (e.key === 'Escape') {
			const { onClose } = this.props;
			onClose();
		}
	}

	render() {
		const { children, className, onClose } = this.props;

		return (
			<div className={`overlay-outer ${className}`}>
				<div
					className="overlay-inner"
					ref={(el) => {
						this.overlayElement = el;
					}}
				>
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
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
