import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /** Event to trigger */
  onClick: () => void;
  /** Text or component on button */
  children?: ReactNode;
};

export default function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <button
      className="p-2 lg:px-4 text-xs lg:text-base  rounded-full shadow-md bg-medium text-bg font-bold hover:bg-light"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
