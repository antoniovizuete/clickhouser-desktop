import { Icon, IconName } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import classNames from 'classnames';
import { useThemeContext } from '../../contexts/useThemeContext';

type Props = {
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

export default function IconBarItem({ icon, isActive, onClick, tooltip }: Props) {
  const { bpTheme } = useThemeContext();

  return (
    <div className={classNames("w-full h-12 flex flex-row justify-center items-center py-6 px-2 border-r-4 hover:cursor-pointer",
      { "border-r-yellow-600 dark:border-r-yellow-600": isActive },
      { "border-r-transparent hover:border-r-yellow-300 hover:dark:border-r-yellow-700": !isActive },
    )}
      onClick={onClick}
    >
      <Tooltip2 content={tooltip} className={bpTheme} hoverOpenDelay={750} placement="right">
        <Icon
          className={classNames("hover:scale-110 !outline-none",
            { "text-yellow-600 dark:text-yellow-500/400 hover:dark:text-yellow-500": isActive },
            { "text-stone-300 dark:text-stone-500 ": !isActive },)}
          icon={icon}
          size={24}

        />
      </Tooltip2>
    </div>
  )
}
