import iconClear from "feather-icons/dist/icons/x.svg";
import React, { PureComponent, ReactNode } from "react";
import SimpleSvg from "react-simple-svg";

import { translations } from "../../../utils/i18n";

interface Props {
	children: ReactNode;
	className?: string;
	onClose: () => void;
}

export default class Overlay extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentDidMount(): void {
		document.addEventListener("click", this.onClick);
		window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount(): void {
		document.removeEventListener("click", this.onClick);
		window.removeEventListener("keydown", this.onKeyDown);
	}

	/**
	 * Close the overlay if the user clicks outside it
	 */
	onClick(e: MouseEvent): void {
		const { onClose } = this.props;
		let targetElement = e.target as Node; // Clicked element

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
	onKeyDown(e: KeyboardEvent): void {
		if (e.key === "Escape") {
			const { onClose } = this.props;
			onClose();
		}
	}

	overlayElement: HTMLDivElement;

	render(): React.ReactNode {
		const { children, className, onClose } = this.props;

		return (
			<div className="overlay-outer">
				<div
					className={`overlay-inner ${className || ""}`}
					ref={el => {
						this.overlayElement = el;
					}}
				>
					<button
						type="button"
						className="button button-invisible overlay-close-button"
						onClick={onClose}
					>
						<SimpleSvg src={iconClear} height={20} width={20} title={translations.close} />
					</button>
					<div className="overlay-content">{children}</div>
				</div>
			</div>
		);
	}
}
