import { useTodoContext } from "context/TodoProvider";
import { Priority, TodoItem } from "typings/types.d";
import TodoItemsListView from "./TodoItemsListView";

interface TodoItemsGridViewProps extends React.HTMLAttributes<HTMLDivElement> {}

function renderItems(items: TodoItem[], priority: Priority) {
  return items
    .filter((item) => item.priority === priority)
    .map((item) => (
      <div key={item.id} className="p-1.5">
        {item.title}
      </div>
    ));
}

export default function TodoItemsGridView({
  ...props
}: TodoItemsGridViewProps) {
  const { items } = useTodoContext();
  return (
    <div {...props}>
      <div className="grid md:grid-cols-2 h-full md:divide-x">
        <div className="grid grid-rows-2 md:divide-y">
          <div className="h-full p-2 overflow-y-auto">
            <TodoItemsListView priorityFilter={Priority.DO} />
          </div>
          <div className="h-full p-2 overflow-y-auto">
            <TodoItemsListView priorityFilter={Priority.SCHEDULE} />
          </div>
        </div>
        <div className="grid grid-rows-2 md:divide-y">
          <div className="h-full  p-2 overflow-y-auto">
            <TodoItemsListView priorityFilter={Priority.DELEGATE} />
          </div>
          <div className="h-full p-2 overflow-y-auto">
            <TodoItemsListView priorityFilter={Priority.DELETE} />
          </div>
        </div>
      </div>
    </div>
  );
}
