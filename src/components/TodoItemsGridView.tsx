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
