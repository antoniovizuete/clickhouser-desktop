import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type Props = {
  fitToContent?: boolean;
  editable?: boolean;
  onBlur: (e: React.FocusEvent<HTMLSpanElement>) => void;
}

export default function EditableSpan({ editable = true, onBlur, children }: PropsWithChildren<Props>) {
  return (
    <span className={
      classNames(
        "pl-2 pr-2 focus:pr-5 py-1 border border-transparent rounded focus:outline-none",
        "w-full h-8 truncate",
        "focus:overflow-visible focus:w-fit focus:z-[19]",
        { "bg-slate-50 dark:bg-neutral-800": editable },
        { "hover:border-slate-300 dark:hover:border-stone-600": editable },
        "focus:bg-white dark:focus:bg-stone-900",
        "focus:border-slate-300 dark:focus:border-stone-600",
      )}
      contentEditable={editable}
      onBlur={onBlur}
    >
      {children}
    </span>
  )
}
