/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

interface SlotProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export function Slot({ children, ...props }: SlotProps) {
	if (React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			...props,
			className: [props.className, (children as any).props.className]
				.filter(Boolean)
				.join(" "),
		});
	}

	return null;
}
