import React, { useEffect, useRef } from "react";
import styles from "./Popover.module.css";

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Popover({
  trigger,
  children,
  isOpen,
  onClose,
}: PopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className={styles.wrapper}>
      {trigger}
      {isOpen && (
        <div className={styles.popover} ref={ref}>
          {children}
        </div>
      )}
    </div>
  );
}
