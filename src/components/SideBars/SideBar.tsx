import { Icon, IconName } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';

type Props = {
  icon?: IconName;
  title?: string;
  buttons?: JSX.Element;
}

export default function SideBar({ buttons, children, icon, title }: PropsWithChildren<Props>) {
  return (
    <div className="w-full h-full pt-2 flex flex-col justify-start items-start bg-stone-50 dark:bg-stone-900">
      <div className="w-full h-10 flex flex-row justify-between items-center pl-4 pb-3">
        <h2 className="flex-grow text-stone-600 dark:text-stone-300 uppercase text-xs font-semibold">
          {icon && <Icon icon={icon} className="mr-2" />}
          {title}
        </h2>
        <div className='flex-grow-0 mr-2'>{buttons}</div>
      </div>
      <div className="flex-grow flex flex-col justify-start items-start w-full">
        {children}
      </div>
    </div>
  )
}
