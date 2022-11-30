import SideMenu, { ViewType } from "components/SideMenu";
import TodoList from "components/TodoList";
import React from "react";
import { Priority } from "typings/types.d";

export default function IndexPage() {
  const [viewType, setViewType] = React.useState(ViewType.LIST);
  const [priority, setPriority] = React.useState<Priority | undefined>();

  const handleMenuSelection = (viewType: ViewType, priority?: Priority) => {
    setViewType(viewType);
    setPriority(priority);
  };
  return (
    <div className="flex flex-row h-screen">
      <SideMenu
        className="flex-none bg-amber-200"
        onSelect={handleMenuSelection}
      />
      <TodoList
        className="h-full w-full p-3 bg-amber-100"
        activeView={viewType}
        priorityFilter={priority}
      />
    </div>
  );
}
