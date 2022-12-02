import { Priority } from "typings/types.d";
import TodoItemsListView from "./TodoItemsListView";

interface TodoItemsGridViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function TodoItemsGridView({
  ...props
}: TodoItemsGridViewProps) {
  return (
    <div {...props}>
      <div className="flex flex-row h-full">
        <div className="hidden md:block flex-none -rotate-90 m-auto w-6">
          <div className="-ml-8">Importance</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="hidden md:block text-center">Urgency</div>
          <div className="flex flex-1">
            <div className="grid md:grid-cols-2 md:divide-x h-full w-full">
              <div className="grid md:grid-rows-2 md:divide-y">
                <TodoItemsListView priorityFilter={Priority.DO} />
                <TodoItemsListView priorityFilter={Priority.SCHEDULE} />
              </div>
              <div className="grid md:grid-rows-2 md:divide-y">
                <TodoItemsListView priorityFilter={Priority.DELEGATE} />
                <TodoItemsListView priorityFilter={Priority.DELETE} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
