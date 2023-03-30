import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type Props = {
  confirmOnEnter?: boolean;
  dismissOnEscape?: boolean;
  editable?: boolean;
  editOnDoubleClick?: boolean;
  isEditing?: boolean;
  onConfirm: (value: string) => void;
  value: string;
};

export default function EditableSpan({
  confirmOnEnter = true,
  dismissOnEscape = true,
  editable = true,
  editOnDoubleClick = true,
  isEditing = false,
  onConfirm,
  value,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(isEditing);
  const [internalValue, setInternalValue] = useState(value);

  const focus = () => {
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  useEffect(() => {
    const editMode = editable === false ? false : isEditing;
    setEditMode(editMode);
    editMode && focus();
  }, [editable, isEditing, inputRef.current]);

  useEffect(() => {
    setEditMode((prev) => (editable === false ? false : prev));
  }, [editable]);

  const handleOnBlur = () => {
    setEditMode(false);
    onConfirm(internalValue);
  };

  const handleOnDobleClick = () => {
    if (!editOnDoubleClick) return;
    setEditMode(true);
    focus();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (confirmOnEnter && event.key === "Enter") {
      handleOnBlur();
    }
    if (dismissOnEscape && event.key === "Escape") {
      setInternalValue(value);
      setEditMode(false);
    }
  };

  const className = classNames(
    "pl-2 pr-2 focus:pr-5 py-1 border border-transparent rounded focus:outline-none",
    "w-full h-8 truncate",
    "focus:overflow-visible focus:w-full focus:z-[19]",
    { "bg-slate-50 dark:bg-neutral-800": editable },
    { "bg-white dark:bg-stone-900": editMode },
    { "focus:border-slate-300 dark:focus:border-stone-600": editMode }
  );

  if (editMode) {
    return (
      <input
        ref={inputRef}
        className={className}
        defaultValue={internalValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
    );
  }

  return (
    <span className={className} onDoubleClick={handleOnDobleClick}>
      {internalValue}
    </span>
  );
}
