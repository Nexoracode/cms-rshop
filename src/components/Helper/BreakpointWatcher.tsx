"use client";

import { useEffect } from "react";

interface BreakpointWatcherProps {
  onBreakpointChange: (isAbove576: boolean) => void;
}

const BreakpointWatcher = ({ onBreakpointChange }: BreakpointWatcherProps) => {
  useEffect(() => {
    const handleResize = () => {
      onBreakpointChange(window.innerWidth >= 576);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // اجرای اولیه

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onBreakpointChange]);

  return null;
};

export default BreakpointWatcher;
