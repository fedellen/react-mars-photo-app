import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /** Event to trigger */
  onClick: () => void;
  /** Text or component on button */
  children?: ReactNode;
  /** Additional TailwindCSS styles or class names for other uses */
  className?: string;
};

export default function Button({
  onClick,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`p-2 lg:px-4 text-xs lg:text-base  rounded-full shadow-md bg-medium text-bg font-bold hover:bg-light ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
