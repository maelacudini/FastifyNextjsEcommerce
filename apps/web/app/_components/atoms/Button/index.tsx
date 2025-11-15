import { FC, PropsWithChildren } from "react";
import { ButtonProps } from "./types";
import { baseClasses, sizes, variants } from "./style";
import { Slot } from "../Slot";

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
	const { children, size = "default", variant = "default", className, asChild = false, ...other } = props;

	const cname = [baseClasses, sizes[size], variants[variant], className && className].join(" ");
	const Comp = asChild ? Slot : "button";

	return (
		<Comp 
			className={cname} 
			{...other}
		>
			{children}
		</Comp>
	);
};
