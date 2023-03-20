import { Icon } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { Tab } from "../../../lib/tabs-handler";
import ClickableIcon from "../../core/ClickableIcon";

type Props = {
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isTouched: boolean;
  setActiveTabId: (id: string) => void;
  onClickCloseTab: (tab: Tab) => void;
  tab: Tab;
}

export default function TabUi({ isActive, isFirst, isLast, isTouched, setActiveTabId, onClickCloseTab, tab }: Props) {
  return (
    <div className="flex flex-col justify-start items-start h-4/5">
      <div
        className={
          classNames(
            "h-full px-2 flex flex-row justify-between items-center gap-2",
            "hover:dark:bg-neutral-800 border-t border-t-stone-500 ",
            "group select-none",
            { "border-l border-l-stone-500 rounded-tl-lg": isFirst },
            { "!border-r border-r-stone-500 rounded-tr-lg": isLast },
            { "dark:bg-neutral-900 cursor-pointer border-b border-b-stone-500": !isActive },
            { "bg-slate-50 dark:bg-neutral-800 cursor-default border-t-2 border-t-yellow-600 dark:border-t-yellow-500": isActive }
          )}
      >
        <div className={"w-full"} onClick={(e) => (console.log(e), setActiveTabId(tab.id))}>
          <Tooltip2
            disabled={tab.name.length < 13}
            minimal
            content={tab.name}
            position="bottom"
          >
            <div className='flex-grow flex flex-row gap-2 justify-start items-center w-36 !outline-none'>
              <Icon icon={tab.icon} /><div className="w-full truncate h-5">{tab.name}</div>
            </div>
          </Tooltip2>
        </div>
        {tab.closeable && (
          <ClickableIcon
            className={classNames(
              { "opacity-0": !isActive && !isTouched },
              { "opacity-100": isActive || isTouched }
            )}
            icon={isTouched ? "record" : "cross"}
            overrideIconOnMouseEnter="cross"
            onClick={() => onClickCloseTab(tab)}
          />
        )}
        {!tab.closeable && isTouched && (<ClickableIcon icon="record" />)}
        {!tab.closeable && !isTouched && (<div className="w-5" />)}
      </div>
    </div>
  )
}
