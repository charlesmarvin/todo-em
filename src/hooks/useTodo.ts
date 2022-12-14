import React from "react";
import {
  InitialTodoState,
  TodoItem,
  TodoActions,
  Priority,
  ViewType,
  ActiveView,
} from "typings/types.d";
import useLocalStorage from "./useLocalStorage";

export const initialState: InitialTodoState = {
  items: [],
  activeView: { view: ViewType.LIST, priority: Priority.DO },
};

export const newIdentifier = (len = 12) =>
  [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

function reducer(state: InitialTodoState, action: TodoActions) {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const items = [...state.items, action.payload];
      return { ...state, items };
    }

    case "UPDATE_ITEM": {
      const items = state.items.map((item: TodoItem) => {
        if (item.id !== action.id) return item;
        return {
          ...item,
          ...action.payload,
        };
      });
      return { ...state, items };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i: TodoItem) => i.id !== action.id);
      return { ...state, items };
    }

    case "SET_ACTIVE_VIEW": {
      const activeView = { ...state.activeView, ...action.payload };
      return { ...state, activeView };
    }

    default:
      return state;
  }
}

const useLocalStorageReducer = (): [
  InitialTodoState,
  React.Dispatch<TodoActions>
] => {
  const [savedState, saveState] = useLocalStorage("todo-em", initialState);
  const reducerLocalStorage = React.useCallback(
    (state: InitialTodoState, action: TodoActions) => {
      const newState = reducer(savedState, action);
      if (newState !== initialState) {
        saveState(newState);
      }
      return newState;
    },
    [savedState, saveState]
  );
  const [_, dispatch] = React.useReducer(reducerLocalStorage, savedState);
  return [savedState, dispatch];
};

export function useTodo() {
  const [state, dispatch] = useLocalStorageReducer();

  const setItems = (items: TodoItem[]) => {
    dispatch({
      type: "SET_ITEMS",
      payload: [...items],
    });
  };

  const addItem = (item: TodoItem) => {
    if (!item.id) throw new Error("You must provide an `id` for items");

    const currentItem = state.items.find((i: TodoItem) => i.id === item.id);

    if (!currentItem) {
      const payload = { ...item };

      dispatch({ type: "ADD_ITEM", payload });

      return;
    }

    const payload = { ...item };

    dispatch({
      type: "UPDATE_ITEM",
      id: item.id,
      payload,
    });
  };

  const updateItem = (id: TodoItem["id"], payload: object) => {
    if (!id || !payload) {
      return;
    }

    dispatch({ type: "UPDATE_ITEM", id, payload });
  };

  const removeItem = (id: TodoItem["id"]) => {
    if (!id) return;

    dispatch({ type: "REMOVE_ITEM", id });
  };

  const getItem = (id: TodoItem["id"]) =>
    state.items.find((i: TodoItem) => i.id === id);

  const setActiveView = (view: ActiveView) => {
    dispatch({
      type: "SET_ACTIVE_VIEW",
      payload: view,
    });
  };

  return {
    getItem,
    setItems,
    addItem,
    updateItem,
    removeItem,
    setActiveView,
    ...state,
  };
}
