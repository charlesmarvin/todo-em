import {
  TrashIcon,
  ArchiveBoxXMarkIcon,
  ArrowUturnRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useTodoContext } from "context/TodoProvider";
import { Priority, TodoItem } from "typings/types.d";
import TodoEditor from "./TodoEditor";
import cn from "clsx";
import React from "react";

interface TodoItemsListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  priorityFilter?: Priority;
}

const PriorityIcons = {
  [Priority.DO]: { icon: SparklesIcon, title: "Do" },
  [Priority.SCHEDULE]: { icon: CalendarDaysIcon, title: "Schedule" },
  [Priority.DELEGATE]: { icon: ArrowUturnRightIcon, title: "Delegate" },
  [Priority.DELETE]: { icon: ArchiveBoxXMarkIcon, title: "Don&apos;t Care" },
};

const renderHeading = (priority?: Priority) => {
  switch (priority) {
    case Priority.DO:
      return <strong>Do</strong>;
    case Priority.SCHEDULE:
      return <strong>Schedule</strong>;
    case Priority.DELEGATE:
      return <strong>Delegate</strong>;
    case Priority.DELETE:
      return <strong>Don&apos;t Care</strong>;
    default:
      return <></>;
  }
};

function IconButton({
  children,
  Icon,
  onClick,
  title,
}: {
  children?: React.ReactNode;
  Icon?: React.ElementType;
  title?: string;
  onClick?: (event: React.SyntheticEvent) => void;
}) {
  const handleClick = (event: React.SyntheticEvent) =>
    onClick && onClick(event);

  return (
    <button
      className="group flex items-center px-2 py-2"
      title={title}
      onClick={handleClick}
    >
      {Icon && (
        <Icon
          className={cn("flex-shrink-0 h-4 w-4", children && "mr-4")}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export default function TodoItemsListView({
  priorityFilter = Priority.DO,
  ...props
}: TodoItemsListViewProps) {
  const { items, removeItem, updateItem } = useTodoContext();
  const [editItem, setEditItem] = React.useState<TodoItem | undefined>(
    undefined
  );
  const [showAddItem, setShowAddItem] = React.useState(false);

  const handleRemoveFn = (id: string) => {
    return (event: React.SyntheticEvent) => {
      event.stopPropagation();
      removeItem(id);
    };
  };
  const handleUpdateFn = (id: string, priority: Priority) => {
    return (event: React.SyntheticEvent) => {
      event.stopPropagation();
      updateItem(id, { priority });
    };
  };
  const handleEditFn = (item: TodoItem) => {
    return (event: React.SyntheticEvent) => {
      event.stopPropagation();
      setEditItem(item);
    };
  };
  const handleEditClose = () => {
    setEditItem(undefined);
  };
  const handleShowAddItem = (event: React.SyntheticEvent) => {
    if (!event.currentTarget.getAttribute("data-container")) {
      return;
    }
    setEditItem(undefined);
    setShowAddItem(true);
  };
  const handleAddItemClose = () => {
    setShowAddItem(false);
  };
  return (
    <div {...props} onClick={handleShowAddItem} data-container>
      <div className="p-3">
        <div className="px-3">{renderHeading(priorityFilter)}</div>
        <div className="overflow-y-scroll">
          {items
            .filter(
              (item: TodoItem) =>
                !priorityFilter || item.priority === priorityFilter
            )
            .map((item: TodoItem) =>
              editItem?.id === item.id ? (
                <TodoEditor
                  key={item.id}
                  value={item}
                  priority={priorityFilter}
                  onClose={handleEditClose}
                />
              ) : (
                <div
                  key={item.id}
                  className="flex justify-between hover:bg-orange-50 hover:rounded-sm"
                >
                  <div
                    className="grow items-center px-3"
                    onClick={handleEditFn(item)}
                  >
                    {item.title}
                  </div>
                  <div className="flex flex-row divide-x">
                    <div className="flex flex-row">
                      {Object.keys(PriorityIcons)
                        .filter((key) => key != priorityFilter?.toString())
                        .map((key: any) => (
                          <IconButton
                            key={key}
                            Icon={PriorityIcons[key].icon}
                            title={PriorityIcons[key].title}
                            onClick={handleUpdateFn(item.id, +key)}
                          />
                        ))}
                    </div>
                    <IconButton
                      Icon={TrashIcon}
                      onClick={handleRemoveFn(item.id)}
                      title="Delete"
                    />
                  </div>
                </div>
              )
            )}
          {showAddItem && (
            <TodoEditor
              priority={priorityFilter}
              onClose={handleAddItemClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
