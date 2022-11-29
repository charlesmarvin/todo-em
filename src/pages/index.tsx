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
    <div className="flex flex-row gap-10 h-screen">
      <SideMenu className="flex-none w-40" onSelect={handleMenuSelection} />
      <TodoList activeView={viewType} priorityFilter={priority} />
    </div>
  );
}
