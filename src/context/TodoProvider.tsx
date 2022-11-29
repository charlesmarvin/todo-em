import { useTodo } from "hooks/useTodo";
import React from "react";
import { TodoProviderState } from "typings/types";

const TodoContext = React.createContext<TodoProviderState | undefined>(
  undefined
);

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) throw new Error("Expected to be wrapped in a CartProvider");
  return context;
};

interface TodoProviderProps {
  children?: React.ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const state = useTodo();
  return <TodoContext.Provider value={state}>{children}</TodoContext.Provider>;
}
