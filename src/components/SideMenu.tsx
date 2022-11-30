import {
  ArchiveBoxXMarkIcon,
  ArrowUturnRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Priority } from "typings/types.d";
import cn from "clsx";

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
  isActive = false,
}: {
  children?: React.ReactNode;
  Icon?: React.ElementType;
  onClick?: () => void;
  isActive: boolean;
}) {
  const handleClick = () => onClick && onClick();
  console.log("isActive", isActive);
  return (
    <button
      className={cn(
        "group flex items-center w-full px-2 py-2 text-base font-medium transition-all hover:bg-amber-300 border-r-4",
        isActive ? "border-amber-400" : "border-transparent"
      )}
      onClick={handleClick}
    >
      {Icon && (
        <Icon className="md:mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
      )}
      <span className="hidden md:inline-block">{children}</span>
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
  const isGridActive = activeView === ViewType.GRID;
  return (
    <div className={className}>
      {children}
      <nav className="space-y-1 pl-2 pt-4">
        <NavButton
          Icon={SparklesIcon}
          onClick={handleFilterFn(Priority.DO)}
          isActive={!isGridActive && activePriority === Priority.DO}
        >
          Do
        </NavButton>
        <NavButton
          Icon={ArrowUturnRightIcon}
          onClick={handleFilterFn(Priority.DELEGATE)}
          isActive={!isGridActive && activePriority === Priority.DELEGATE}
        >
          Delegate
        </NavButton>
        <NavButton
          Icon={CalendarDaysIcon}
          onClick={handleFilterFn(Priority.SCHEDULE)}
          isActive={!isGridActive && activePriority === Priority.SCHEDULE}
        >
          Schedule
        </NavButton>
        <NavButton
          Icon={ArchiveBoxXMarkIcon}
          onClick={handleFilterFn(Priority.DELETE)}
          isActive={!isGridActive && activePriority === Priority.DELETE}
        >
          Don&apos;t Care
        </NavButton>

        <div className="w-full border-t border-gray-300" />

        <NavButton
          Icon={Squares2X2Icon}
          onClick={handleViewChange}
          isActive={isGridActive}
        >
          All Items
        </NavButton>
      </nav>
    </div>
  );
}
