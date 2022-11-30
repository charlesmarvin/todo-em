import { useTodoContext } from "context/TodoProvider";
import { newIdentifier } from "hooks/useTodo";
import React from "react";
import { Priority, TodoItem } from "typings/types.d";

interface TodoEditorProps {
  priority?: Priority;
  value?: TodoItem;
  onClose?: () => void;
}

export default function TodoEditor({
  priority = Priority.DO,
  value,
  onClose,
}: TodoEditorProps) {
  const [entry, setEntry] = React.useState(() =>
    [value?.title, value?.detail].filter((s) => s && s.length).join("\n")
  );
  const { addItem, updateItem } = useTodoContext();

  const handleChange = (event: any) => {
    setEntry(event.target.value);
  };
  const handleSave = (event: any) => {
    // dont allow saving with empty content if there
    // was to task entry call close callback and return
    if (!entry) {
      onClose && onClose();
      return;
    }
    // use first newline to separate title from details
    const [title, ...details] = entry.split("\n");
    const detail = details.join("\n");
    // if a value was provided to the editor we are in the
    // edit mode. Otherwise we are adding a new value/TodoItem
    if (value) {
      updateItem(value.id, {
        title,
        detail,
      });
    } else {
      addItem({
        // `id` and `createdAt` should be set in domain but app is client side only
        id: newIdentifier(),
        createdAt: new Date(),
        title: title,
        detail: detail,
        priority: priority,
      });
    }
    // clear entry text and call onClose callback
    setEntry("");
    onClose && onClose();
  };
  return (
    <div
      className="m-2"
      onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
    >
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
      <div>
        <label htmlFor="editor" className="text-xs text-gray-700">
          Task summary. Optionally, hit <code>&lt;return&gt;</code> to add a
          description. Entry will be saved when the field loses focus.
        </label>
      </div>
    </div>
  );
}
