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
      className="px-4 py-2 mx-4 rounded-full shadow-md bg-medium text-bg font-bold hover:bg-light"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
