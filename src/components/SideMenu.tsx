import React from "react";
import Nav, { NavProps } from "./Nav";

interface SideMenuProps extends NavProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SideMenu({
  children,
  className,
  activeView,
  onSelect,
}: SideMenuProps) {
  return (
    <div className={className}>
      {children}
      <Nav activeView={activeView} onSelect={onSelect} />
    </div>
  );
}
