import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type SubHeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  /** Text or component inside SubHeading */
  children?: ReactNode;
  /** Additional TailwindCSS styles or class names for other uses */
  className?: string;
};

export default function SubHeading({
  onClick,
  children,
  className,
  ...props
}: SubHeadingProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl xl:text-4xl p-10 md:pb-20 font-extrabold text-center ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
