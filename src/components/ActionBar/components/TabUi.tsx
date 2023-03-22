import { Icon } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useSaveQuery } from "../../../hooks/useSaveQuery";
import { Tab } from "../../../lib/tabs-handler";
import ClickableIcon from "../../core/ClickableIcon";
import EditableSpan from "../../core/EditableSpan";

type Props = {
  isActive: boolean;
  isLast: boolean;
  isTouched: boolean;
  setActiveTabId: (id: string) => void;
  onClickCloseTab: (tab: Tab) => void;
  tab: Tab;
}

export default function TabUi({ isActive, isLast, isTouched, setActiveTabId, onClickCloseTab, tab }: Props) {
  const { renameTab } = useTabsContext();
  const [saveQuery] = useSaveQuery();
  const handleOnBlurEditableSpan = (e: React.FocusEvent<HTMLSpanElement>) => {
    if (e.currentTarget.innerText !== tab.name) {
      renameTab(e.currentTarget.innerText);
      saveQuery({
        ...tab,
        name: e.currentTarget.innerText,
      }, "Query renamed successfully", "Error renaming query");
    }
  }
  return (
    <div className="flex flex-col justify-start items-start h-full">
      <div
        className={
          classNames(
            "h-full px-2 flex flex-row justify-between items-center gap-2",
            "hover:dark:bg-neutral-800  ",
            "group select-none",
            { "!border-r dark:border-r-stone-600": isLast },
            { "dark:bg-neutral-900 cursor-pointer border-b dark:border-b-stone-600 dark:border-t-stone-500": !isActive },
            { "bg-slate-50 dark:bg-neutral-800 cursor-default border-t-2 border-t-yellow-600 dark:border-t-yellow-500": isActive }
          )}
      >
        <div className={"w-full"} onClick={(e) => setActiveTabId(tab.id)}>
          <Tooltip2
            disabled={tab.name.length < 13}
            minimal
            content={tab.name}
            position="bottom"
          >
            <div className='flex-grow flex flex-row gap-2 justify-start items-center w-36 !outline-none'>
              <Icon icon={tab.icon} />
              <EditableSpan editable={isActive} onBlur={handleOnBlurEditableSpan}>{tab.name}</EditableSpan>
            </div>
          </Tooltip2>
        </div>
        {tab.closeable && (
          <ClickableIcon
            className={classNames(
              { "opacity-0": !isActive && !isTouched },
              { "opacity-100": isActive || isTouched },
              "z"
            )}
            icon={isTouched ? "record" : "cross"}
            overrideIconOnMouseEnter="cross"
            onClick={() => onClickCloseTab(tab)}
          />
        )}
        {!tab.closeable && isTouched && (<ClickableIcon icon="record" />)}
        {!tab.closeable && !isTouched && (<div className="w-6" />)}
      </div>
    </div>
  )
}
