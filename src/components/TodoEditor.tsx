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
  const [entry, setEntry] = React.useState(() =>
    [value?.title, value?.detail].filter((s) => s && s.length).join("\n")
  );
  const { addItem, updateItem } = useTodoContext();

  const handleChange = (event: any) => {
    setEntry(event.target.value);
  };
  const handleSave = (event: any) => {
    if (!entry) {
      onSave && onSave();
      return;
    }
    const [title, ...details] = entry.split("\n");
    const detail = details.join("\n");
    if (value) {
      updateItem(value.id, {
        title,
        detail,
      });
    } else {
      addItem({
        id: newIdentifier(),
        title: title,
        detail: detail,
        priority: priority,
        createdAt: new Date(),
      });
    }
    setEntry("");
    onSave && onSave();
  };
  return (
    <div className="m-2">
      <textarea
        id="editor"
        autoFocus
        className="w-full prose prose-code:prose-sm p-1.5 bg-amber-50 rounded-sm"
        placeholder={`Title
Description`}
        value={entry}
        onChange={handleChange}
        onBlur={handleSave}
      />
      <label htmlFor="editor" className="text-xs text-gray-700">
        Task summary. Optionally, hit <code>&lt;return&gt;</code> to add a
        description. Entry will be saved when the field loses focus.
      </label>
    </div>
  );
}
