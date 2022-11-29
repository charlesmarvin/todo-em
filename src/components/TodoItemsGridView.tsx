import { Priority } from "typings/types.d";
import TodoItemsListView from "./TodoItemsListView";

interface TodoItemsGridViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function TodoItemsGridView({
  ...props
}: TodoItemsGridViewProps) {
  return (
    <div {...props}>
      <div className="grid md:grid-cols-2 h-full md:divide-x">
        <div className="grid grid-rows-2 md:divide-y">
          <TodoItemsListView
            className="h-full  p-2 overflow-y-auto"
            priorityFilter={Priority.DO}
          />
          <TodoItemsListView
            className="h-full  p-2 overflow-y-auto"
            priorityFilter={Priority.SCHEDULE}
          />
        </div>
        <div className="grid grid-rows-2 md:divide-y">
          <TodoItemsListView
            className="h-full  p-2 overflow-y-auto"
            priorityFilter={Priority.DELEGATE}
          />
          <TodoItemsListView
            className="h-full  p-2 overflow-y-auto"
            priorityFilter={Priority.DELETE}
          />
        </div>
      </div>
    </div>
  );
}
