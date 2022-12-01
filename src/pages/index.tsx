import SideMenu from "components/SideMenu";
import TodoList from "components/TodoList";
import { useTodoContext } from "context/TodoProvider";
import React from "react";
import { ActiveView } from "typings/types.d";

export default function IndexPage() {
  const { activeView, setActiveView } = useTodoContext();

  const handleMenuSelection = (nextView: ActiveView) => {
    setActiveView(nextView);
  };

  return (
    <div className="flex flex-row h-screen">
      <SideMenu
        className="shrink-0 bg-amber-200"
        onSelect={handleMenuSelection}
        activeView={activeView}
      />
      <TodoList
        className="h-full w-full p-3 bg-amber-100"
        activeView={activeView}
      />
    </div>
  );
}
