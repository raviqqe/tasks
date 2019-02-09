import { useState } from "react";

export function useInputState(
  initialText: string,
  onEdit: (text: string) => void
) {
  const [editing, rawSetEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const setEditing = nextEditing => {
    if (!editing && nextEditing) {
      setText(initialText);
    } else if (editing && !nextEditing) {
      onEdit(text.trim());
    }

    rawSetEditing(nextEditing);
  };

  return {
    editing,
    inputProps: {
      autoFocus: true,
      onBlur: () => setEditing(false),
      onChange: ({ target: { value } }) => setText(value),
      onFocus: event => {
        event.target.value = "";
        event.target.value = initialText;
      },
      value: initialText
    },
    setEditing,
    text
  };
}
