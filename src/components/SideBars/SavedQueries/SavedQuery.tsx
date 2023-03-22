import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { Query } from '../../../lib/backend-repos/query-repo';
import ClickableIcon from '../../core/ClickableIcon';

type Props = {
  query: Query;
  onClick: (query: Query) => void;
  onClickRemove: (query: Query) => void;
}

export default function SavedQuery({ query, onClick, onClickRemove }: Props) {
  return (
    <Tooltip2 content={query.name} hoverOpenDelay={750} className="w-full">
      <div
        key={query.id}
        className="w-full group flex justify-between items-center px-2 text-stone-400 dark:text-stone-600 hover:text-stone-600 hover:dark:text-stone-400 gap-2 hover:cursor-pointer"
      >
        <div className="flex justify-start items-center truncate" onClick={() => onClick(query)}>
          <Icon icon="console" className="mr-2 flex-grow-0 " />
          <div className='truncate text-stone-600 dark:text-stone-400'>{query.name}</div>
        </div>
        <ClickableIcon
          icon="delete"
          className="opacity-0 group-hover:opacity-100 hover:scale-110 hover:text-red-600"
          onClick={() => onClickRemove(query)}
        />
      </div>
    </Tooltip2>
  )
}
