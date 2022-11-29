import { Priority } from "typings/types.d";
import { ViewType } from "./SideMenu";
import TodoItemsGridView from "./TodoItemsGridView";
import TodoItemsListView from "./TodoItemsListView";

function renderView(view: ViewType, priorityFilter?: Priority) {
  switch (view) {
    case ViewType.LIST:
      return (
        <TodoItemsListView
          className="flex-auto h-screen"
          priorityFilter={priorityFilter}
        />
      );
    case ViewType.GRID:
      return <TodoItemsGridView className="flex-auto h-screen" />;
    default:
      return null;
  }
}

interface TodoListProps {
  activeView: ViewType;
  priorityFilter?: Priority;
}

export default function TodoList({
  activeView,
  priorityFilter,
}: TodoListProps) {
  return (
    <div className="h-full w-full p-3">
      {renderView(activeView, priorityFilter)}
    </div>
  );
}
