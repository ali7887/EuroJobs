import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function Popover({ children }: Props) {
  return (
    <div className="absolute bg-white shadow-lg p-4 rounded">
      {children}
    </div>
  );
}
