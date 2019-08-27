import { useState } from "react";

export function useInputState<E extends Element>(
  initialText: string,
  onEdit: (text: string) => void
) {
  const [editing, rawSetEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const setEditing = (nextEditing: boolean) => {
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
      onChange: ({ target: { value } }: any) => setText(value),
      onFocus: (event: any) => {
        event.target.value = "";
        event.target.value = initialText;
      },
      value: initialText
    },
    setEditing,
    text
  };
}
