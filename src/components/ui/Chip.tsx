import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Chip({ children, className = "", ...props }: Props) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

