export enum Priority {
  DO = 1,
  DELEGATE,
  SCHEDULE,
  DELETE,
}
export interface TodoItem {
  id: string;
  priority: Priority;
  title: string;
  detail: string;
  createdAt: Date;
}

export interface InitialTodoState {
  items: TodoItem[];
}

export interface TodoProviderState {
  items: TodoItem[];
  getItem: (id: string) => TodoItem | undefined;
  setItems: (items: TodoItem[]) => void;
  addItem: (item: TodoItem) => void;
  updateItem: (id: string, payload: object) => void;
  removeItem: (id: string) => void;
}

export type TodoActions =
  | { type: "SET_ITEMS"; payload: TodoItem[] }
  | { type: "ADD_ITEM"; payload: TodoItem }
  | { type: "REMOVE_ITEM"; id: TodoItem["id"] }
  | {
      type: "UPDATE_ITEM";
      id: TodoItem["id"];
      payload: object;
    };
