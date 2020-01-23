import ClearIcon from "feather-icons/dist/icons/x.svg";
import React, { PureComponent, ReactNode } from "react";

import { translations } from "../../../utils/i18n";
import { iconProps } from "../../../utils/icons";

export interface DispatchProps {
	closeOverlay: () => void;
}

export interface CustomProps {
	children: ReactNode;
	className?: string;
}

type Props = DispatchProps & CustomProps;

export default class Overlay extends PureComponent<Props, {}> {
	overlayElement: HTMLDivElement;

	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onClick = this.onClick.bind(this);
		this.onClose = this.onClose.bind(this);
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
		let targetElement = e.target as Node; // Clicked element

		/* eslint-disable-next-line no-constant-condition */
		while (true) {
			if (targetElement === this.overlayElement) {
				// Click inside overlay: Exit
				return;
			}
			if (targetElement.parentNode) {
				// Click outside overlay: Move up the DOM
				targetElement = targetElement.parentNode;
			} else {
				// DOM root is reached: Close overlay, exit
				this.onClose();
				return;
			}
		}
	}

	onClose(): void {
		const { closeOverlay } = this.props;

		closeOverlay();
	}

	/**
	 * Close the overlay when the ESC key is pressed
	 */
	onKeyDown(e: KeyboardEvent): void {
		if (e.key === "Escape") {
			this.onClose();
		}
	}

	render(): ReactNode {
		const { children, className } = this.props;

		return (
			<div className="overlay-outer">
				<div
					className={`overlay-inner ${className || ""}`}
					ref={(overlayElement: HTMLDivElement): void => {
						this.overlayElement = overlayElement;
					}}
				>
					<button
						type="button"
						className="button button-invisible overlay-close-button"
						onClick={this.onClose}
					>
						<ClearIcon {...iconProps} title={translations.close} />
					</button>
					<div className="overlay-content">{children}</div>
				</div>
			</div>
		);
	}
}
