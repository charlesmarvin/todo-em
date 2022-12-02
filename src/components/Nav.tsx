import {
  SparklesIcon,
  ArrowUturnRightIcon,
  CalendarDaysIcon,
  ArchiveBoxXMarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { ActiveView, Priority, ViewType } from "typings/types.d";
import cn from "clsx";

export interface NavProps {
  activeView: ActiveView;
  onSelect: (nextView: ActiveView) => void;
}

function NavButton({
  children,
  Icon,
  title,
  onClick,
  isActive = false,
}: {
  children?: React.ReactNode;
  Icon?: React.ElementType;
  title?: string;
  onClick?: () => void;
  isActive: boolean;
}) {
  const handleClick = () => onClick && onClick();
  return (
    <button
      className={cn(
        "group flex items-center w-full px-2 py-2 text-base font-medium transition-all hover:bg-amber-300 border-r-4",
        isActive ? "border-amber-400" : "border-transparent"
      )}
      title={title}
      onClick={handleClick}
    >
      {Icon && (
        <Icon className="md:mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
      )}
      <span className="hidden md:inline-block">{children}</span>
    </button>
  );
}
export default function Nav({ activeView, onSelect }: NavProps) {
  const handleFilterFn = (priority: Priority) => {
    return () => {
      onSelect({ view: ViewType.LIST, priority });
    };
  };
  const handleViewChange = () => {
    onSelect({ ...activeView, view: ViewType.GRID });
  };
  const isGridActive = activeView.view === ViewType.GRID;
  return (
    <nav className="space-y-1 pl-2 pt-4">
      <NavButton
        Icon={SparklesIcon}
        onClick={handleFilterFn(Priority.DO)}
        isActive={!isGridActive && activeView.priority === Priority.DO}
        title="Do First Task List"
      >
        Do
      </NavButton>
      <NavButton
        Icon={ArrowUturnRightIcon}
        onClick={handleFilterFn(Priority.DELEGATE)}
        isActive={!isGridActive && activeView.priority === Priority.DELEGATE}
        title="Delegate Task List"
      >
        Delegate
      </NavButton>
      <NavButton
        Icon={CalendarDaysIcon}
        onClick={handleFilterFn(Priority.SCHEDULE)}
        isActive={!isGridActive && activeView.priority === Priority.SCHEDULE}
      >
        Schedule
      </NavButton>
      <NavButton
        Icon={ArchiveBoxXMarkIcon}
        onClick={handleFilterFn(Priority.DELETE)}
        isActive={!isGridActive && activeView.priority === Priority.DELETE}
        title="Don't Do Task List"
      >
        Don&apos;t Do
      </NavButton>

      <div className="w-full border-t border-gray-300" />

      <NavButton
        Icon={Squares2X2Icon}
        onClick={handleViewChange}
        isActive={isGridActive}
        title="All Tasks Eisenhower Matrix"
      >
        All Items
      </NavButton>
    </nav>
  );
}
