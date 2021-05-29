import { ReactNode, useState } from "react";

type PhotoInfoProps = { children?: ReactNode; className?: string };

export default function PhotoInfo({ children, className }: PhotoInfoProps) {
  const [hide, setHide] = useState(false);
  if (hide) return null;
  return (
    <div
      className={`flex flex-col bg-bg bg-opacity-80 px-4 rounded-xl rounded-b-none ${className} items-start absolute`}
      onClick={() => setHide(true)}
    >
      {children}
    </div>
  );
}
