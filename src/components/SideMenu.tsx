import {
  ArchiveBoxXMarkIcon,
  ArrowUturnRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Priority } from "typings/types.d";

interface SideMenuProps {
  children?: React.ReactNode;
  className?: string;
  activeView?: ViewType;
  activePriority?: Priority;
  onSelect: (nextView: ViewType, priority?: Priority) => void;
}

export enum ViewType {
  LIST,
  GRID,
}

function NavButton({
  children,
  Icon,
  onClick,
}: {
  children?: React.ReactNode;
  Icon?: React.ElementType;
  onClick?: () => void;
}) {
  const handleClick = () => onClick && onClick();

  return (
    <button
      className="group flex items-center px-2 py-2 text-base font-medium rounded-md"
      onClick={handleClick}
    >
      {Icon && (
        <Icon className="mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
export default function SideMenu({
  children,
  className,
  activeView,
  activePriority,
  onSelect,
}: SideMenuProps) {
  const handleFilterFn = (priority: Priority) => {
    return () => {
      onSelect(ViewType.LIST, priority);
    };
  };
  const handleViewChange = () => {
    onSelect(ViewType.GRID);
  };
  return (
    <div className={className}>
      {children}
      <nav className="space-y-1 px-2">
        <NavButton Icon={SparklesIcon} onClick={handleFilterFn(Priority.DO)}>
          Do
        </NavButton>
        <NavButton
          Icon={ArrowUturnRightIcon}
          onClick={handleFilterFn(Priority.DELEGATE)}
        >
          Delegate
        </NavButton>
        <NavButton
          Icon={CalendarDaysIcon}
          onClick={handleFilterFn(Priority.SCHEDULE)}
        >
          Schedule
        </NavButton>
        <NavButton
          Icon={ArchiveBoxXMarkIcon}
          onClick={handleFilterFn(Priority.DELETE)}
        >
          Don't Care
        </NavButton>

        <div className="w-full border-t border-gray-300" />

        <NavButton Icon={Squares2X2Icon} onClick={handleViewChange}>
          All Items
        </NavButton>
      </nav>
    </div>
  );
}
