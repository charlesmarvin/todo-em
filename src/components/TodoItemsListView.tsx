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
import { useState } from "react";

interface TodoItemsListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  priorityFilter?: Priority;
}

const PriorityIcons = {
  [Priority.DO]: SparklesIcon,
  [Priority.SCHEDULE]: CalendarDaysIcon,
  [Priority.DELEGATE]: ArrowUturnRightIcon,
  [Priority.DELETE]: ArchiveBoxXMarkIcon,
};

const renderHeading = (priority?: Priority) => {
  switch (priority) {
    case Priority.DO:
      return <strong>Important and Urgent</strong>;
    case Priority.SCHEDULE:
      return <strong>Important Not Urgent</strong>;
    case Priority.DELEGATE:
      return <strong>Urgent Not Important</strong>;
    case Priority.DELETE:
      return <strong>Not Important Not Urgent</strong>;
    default:
      return <></>;
  }
};

function Button({
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
  const [editItem, setEditItem] = useState<TodoItem | undefined>(undefined);
  const handleRemoveFn = (id: string) => {
    return () => {
      removeItem(id);
    };
  };
  const handleUpdateFn = (id: string, priority: Priority) => {
    return () => {
      updateItem(id, { priority });
    };
  };
  const handleEditFn = (item: TodoItem) => {
    return () => setEditItem(item);
  };
  const handleSave = () => {
    setEditItem(undefined);
  };
  return (
    <div {...props}>
      {renderHeading(priorityFilter)}
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
              onSave={handleSave}
            />
          ) : (
            <div
              key={item.id}
              className="flex justify-between p-1.5 hover:bg-grey "
            >
              <div onClick={handleEditFn(item)}>{item.title}</div>
              <div className="flex flex-row divide-x">
                <div className="flex flex-row">
                  {Object.keys(PriorityIcons)
                    .filter((key) => key != priorityFilter?.toString())
                    .map((key: any) => (
                      <Button
                        key={key}
                        Icon={PriorityIcons[key]}
                        onClick={handleUpdateFn(item.id, +key)}
                      />
                    ))}
                </div>
                <Button Icon={TrashIcon} onClick={handleRemoveFn(item.id)} />
              </div>
            </div>
          )
        )}
    </div>
  );
}
