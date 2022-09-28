import { forwardRef, MouseEventHandler } from "react";
import { FaSpinner } from "react-icons/fa";
import style from "./button.module.css";

type ButtonProps = {
	children: React.ReactNode;
	colorScheme?: "green" | "gray";
	isDisabled?: boolean;
	isLoading?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props: ButtonProps, ref) => {
		const {
			children,
			colorScheme = "green",
			isDisabled,
			isLoading,
			onClick,
		} = props;

		const colorSchemeClass: Record<"green" | "gray", any> = {
			green: style["btn-green"],
			gray: style["btn-gray"],
		};

		const classes = [
			style["btn-wrapper"],
			colorSchemeClass[colorScheme],
		].join(" ");

		return (
			<button
				ref={ref}
				onClick={onClick}
				disabled={isDisabled || isLoading}
				className={classes}>
				{isLoading ? (
					<div className="flex justify-center">
						<FaSpinner size="18" className="animate-spin" />
					</div>
				) : (
					children
				)}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
