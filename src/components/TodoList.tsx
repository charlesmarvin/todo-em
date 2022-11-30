import { Priority } from "typings/types.d";
import { ViewType } from "./SideMenu";
import TodoItemsGridView from "./TodoItemsGridView";
import TodoItemsListView from "./TodoItemsListView";

function renderView(view: ViewType, priorityFilter?: Priority) {
  switch (view) {
    case ViewType.LIST:
      return (
        <TodoItemsListView
          className="flex-auto h-full"
          priorityFilter={priorityFilter}
        />
      );
    case ViewType.GRID:
      return <TodoItemsGridView className="flex-auto h-full" />;
    default:
      return null;
  }
}

interface TodoListProps {
  className?: string;
  activeView: ViewType;
  priorityFilter?: Priority;
}

export default function TodoList({
  className,
  activeView,
  priorityFilter,
}: TodoListProps) {
  return (
    <div className={className}>{renderView(activeView, priorityFilter)}</div>
  );
}
