import { useTodoContext } from "context/TodoProvider";
import { newIdentifier } from "hooks/useTodo";
import React from "react";
import { Priority, TodoItem } from "typings/types.d";

interface TodoEditorProps {
  priority?: Priority;
  value?: TodoItem;
  onSave?: () => void;
}

export default function TodoEditor({
  priority = Priority.DO,
  value,
  onSave,
}: TodoEditorProps) {
  const [entry, setEntry] = React.useState(value?.title ?? "");
  const { addItem, updateItem } = useTodoContext();

  const handleChange = (event: any) => {
    setEntry(event.target.value);
  };
  const handleSave = (event: any) => {
    if (!entry) {
      onSave && onSave();
      return;
    }
    if (value) {
      updateItem(value.id, {
        title: entry,
        detail: "",
      });
    } else {
      addItem({
        id: newIdentifier(),
        title: entry,
        detail: "",
        priority: priority,
        createdAt: new Date(),
      });
    }
    setEntry("");
    onSave && onSave();
  };
  return (
    <>
      <div className="m-2">
        <textarea
          autoFocus
          className="w-full prose prose-code:prose-sm p-1.5 bg-yellow-100 rounded-lg"
          value={entry}
          onChange={handleChange}
          onBlur={handleSave}
        />
      </div>
    </>
  );
}
