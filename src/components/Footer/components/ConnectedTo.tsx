import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import classNames from 'classnames';
import { useConnectionContext } from '../../../contexts/useConnectionContext';
import { getInverseBW } from '../../../lib/colors-helpers';
import { getConnectionDisplay } from '../../../lib/connections-helpers';

export default function ConnectedTo() {
  const { activeConnectionDisplay } = useConnectionContext();

  const icon = activeConnectionDisplay ? "link" : "remove";
  const caption = activeConnectionDisplay ? getConnectionDisplay({ connection: activeConnectionDisplay }) : "No connection";
  const style = activeConnectionDisplay ? {
    backgroundColor: activeConnectionDisplay.color,
    color: getInverseBW(activeConnectionDisplay.color),
  } : {};

  return (

    <Tooltip2 className='h-full' compact minimal inheritDarkTheme content={caption} hoverOpenDelay={750} placement="top">
      <div className={classNames(
        'h-full w-14 px-2 flex flex-row justify-center items-center !outline-none'
      )}
        style={style}
      >
        <Icon icon={icon} className="mr-1" />

      </div>
    </Tooltip2>


  )
}
