import React from "react";
import { svgIcons, type SvgIconName } from "./svg-icons";

type IconProps = {
	name: SvgIconName;
	size?: number;
	className?: string;
};

export default function Icon({ name, size = 24, className }: IconProps) {
	const render = svgIcons[name];
	if (!render) {
		return null;
	}
	return <>{render({ size, className })}</>;
}


