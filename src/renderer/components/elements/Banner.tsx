import iconError from "feather-icons/dist/icons/alert-triangle.svg";
import iconInfo from "feather-icons/dist/icons/info.svg";
import React, { FunctionComponent } from "react";
import SimpleSvg from "react-simple-svg";

interface Props {
	className?: string;
	message: string;
	bannerType: BannerType;
}

const Banner: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const { className, message, bannerType } = props;

	return (
		<div className={`banner banner-${bannerType} ${className ? className : ''}`}>
			<SimpleSvg src={bannerType === "error" ? iconError : iconInfo} height={20} width={20} />
			<p>{message}</p>
		</div>
	);
};

export default Banner;
