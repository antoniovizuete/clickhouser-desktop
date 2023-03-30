import { Icon } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { useState } from "react";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useSaveQuery } from "../../../events/save-query/useSaveQuery";
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
};

export default function TabUi({
  isActive,
  isLast,
  isTouched,
  setActiveTabId,
  onClickCloseTab,
  tab,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { renameTab } = useTabsContext();
  const [saveQuery] = useSaveQuery();
  const handleOnConfirmEditableSpan = (value: string) => {
    setIsEditing(false);
    if (value !== tab.name) {
      renameTab(value);
      saveQuery(
        {
          ...tab,
          name: value,
        },
        "Query renamed successfully",
        "Error renaming query"
      );
    }
  };

  return (
    <div className="flex flex-col justify-start items-start h-full">
      <div
        className={classNames(
          "h-full px-2 flex flex-row justify-between items-center gap-2",
          "hover:dark:bg-neutral-800  ",
          "group select-none",
          { "!border-r border-r-border dark:border-r-border-dark": isLast },
          {
            "dark:bg-neutral-900 cursor-pointer border-b border-b-border dark:border-b-border-dark dark:border-t-stone-500":
              !isActive,
          },
          {
            "bg-slate-50 dark:bg-neutral-800 cursor-default border-t-2 border-t-yellow-600 dark:border-t-yellow-500":
              isActive,
          }
        )}
      >
        <div className={"w-full"} onClick={() => setActiveTabId(tab.id)}>
          <Tooltip2
            disabled={tab.name.length < 13}
            minimal
            content={tab.name}
            position="bottom"
          >
            <div className="flex-grow flex flex-row gap-2 justify-start items-center w-36 !outline-none">
              <Icon icon={tab.icon} />
              <EditableSpan
                editable={isActive}
                isEditing={isEditing}
                onConfirm={handleOnConfirmEditableSpan}
                value={tab.name}
              />
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
        {!tab.closeable && isTouched && <ClickableIcon icon="record" />}
        {!tab.closeable && !isTouched && <div className="w-6" />}
      </div>
    </div>
  );
}
