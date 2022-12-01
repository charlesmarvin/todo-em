import { ActiveView, Priority, ViewType } from "typings/types.d";
import TodoItemsGridView from "./TodoItemsGridView";
import TodoItemsListView from "./TodoItemsListView";

function renderView(view: ActiveView) {
  switch (view.view) {
    case ViewType.LIST:
      return (
        <TodoItemsListView
          className="flex-auto h-full"
          priorityFilter={view.priority}
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
  activeView: ActiveView;
}

export default function TodoList({ className, activeView }: TodoListProps) {
  return <div className={className}>{renderView(activeView)}</div>;
}
