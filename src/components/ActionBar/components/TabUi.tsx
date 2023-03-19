import { Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { Tab } from "../../../lib/tabs-handler";
import ClickableIcon from "../../core/ClickableIcon";

type Props = {
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  setActiveTabId: (id: string) => void;
  removeTab: (id: string) => void;
  tab: Tab;
}

export default function TabUi({ isActive, isFirst, isLast, setActiveTabId, removeTab, tab }: Props) {
  return (
    <div className="flex flex-col justify-start items-start h-4/5">
      {/*<div className={classNames("w-full",
        { "bg-yellow-500 dark:bg-yellow-600 h-0.5": isActive },
        { "bg-transparent h-1": !isActive }
  )} />*/}
      <div
        className={
          classNames(
            "h-full px-2 flex flex-row justify-between items-center gap-2",
            "hover:dark:bg-neutral-800 border-t border-t-stone-500 ",
            "group select-none",
            { "border-l border-l-stone-500": isFirst },
            { "!border-r border-r-stone-500": isLast },
            { "dark:bg-neutral-900 cursor-pointer border-b border-b-stone-500": !isActive },
            { "bg-slate-50 dark:bg-neutral-800 cursor-default border-t-2 border-t-yellow-600 dark:border-t-yellow-500": isActive }
          )}
      >
        <div className='flex-grow flex flex-row gap-2 justify-start items-center w-32' onClick={() => setActiveTabId(tab.id)}>
          <Icon icon={tab.icon} /><span>{tab.name}</span>
        </div>
        {tab.closeable && (
          <ClickableIcon
            className={classNames(
              { "opacity-0": !isActive },
              { "opacity-100": isActive }
            )}
            icon="cross"
            onClick={() => removeTab(tab.id)}
          />
        )}
      </div>
    </div>
  )
}
