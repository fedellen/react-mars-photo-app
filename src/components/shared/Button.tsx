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
      className="px-4 py-2 mx-4 rounded-full shadow-md bg-text text-bg font-bold"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
