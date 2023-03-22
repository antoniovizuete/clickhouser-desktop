import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type Props = {
  editable?: boolean;
  onBlur: (e: React.FocusEvent<HTMLSpanElement>) => void;
}

export default function EditableSpan({ editable = true, onBlur, children }: PropsWithChildren<Props>) {
  return (
    <span className={
      classNames(
        "w-fit pl-2 pr-5 py-1 border border-transparent rounded focus:outline-none",
        "bg-slate-50 dark:bg-neutral-800",
        "hover:border-slate-300 dark:hover:border-stone-600",
        "focus:bg-white dark:focus:bg-stone-900",
        "focus:border-slate-300 dark:focus:border-stone-600"
      )}
      contentEditable={editable}
      onBlur={onBlur}>{children}</span>
  )
}
