export enum ViewType {
  LIST = 1,
  GRID,
}

export enum Priority {
  DO = 1,
  DELEGATE,
  SCHEDULE,
  DELETE,
}

export type ActiveView = {
  view?: ViewType
  priority?: Priority
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
  activeView: ActiveView;
}

export interface TodoProviderState {
  items: TodoItem[];
  getItem: (id: string) => TodoItem | undefined;
  setItems: (items: TodoItem[]) => void;
  addItem: (item: TodoItem) => void;
  updateItem: (id: string, payload: object) => void;
  removeItem: (id: string) => void;
  setActiveView: (view: ActiveView) => void;
  activeView: ActiveView;
}

export type TodoActions =
  | { type: "SET_ACTIVE_VIEW"; payload: ActiveView}
  | { type: "SET_ITEMS"; payload: TodoItem[] }
  | { type: "ADD_ITEM"; payload: TodoItem }
  | { type: "REMOVE_ITEM"; id: TodoItem["id"] }
  | {
      type: "UPDATE_ITEM";
      id: TodoItem["id"];
      payload: object;
    };
