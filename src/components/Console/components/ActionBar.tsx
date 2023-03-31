import classNames from "classnames";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useSaveQuery } from "../../../events/save-query/useSaveQuery";

import { Tab } from "../../../lib/tabs-handler";
import ClickableIcon from "../../core/ClickableIcon";
import Tabs from "./Tabs";

type ActionBarProps = {
  onClickRunQuery: () => void;
  onClickParameters: () => void;
  showParams: boolean;
};

export default function ActionBar({
  onClickRunQuery,
  onClickParameters,
  showParams,
}: ActionBarProps) {
  const { activeConnectionId } = useConnectionContext();
  const { getActiveTab, sqlEditorRef, jsonEditorRef, addTab, activeTabId } =
    useTabsContext();
  const [saveQuery] = useSaveQuery();

  const handleOnClickSave = async () => {
    const tab = getActiveTab();

    saveQuery({
      ...(tab || ({} as Tab)),
      sql: sqlEditorRef.current?.getValue() ?? "",
      params: jsonEditorRef.current?.getValue() ?? "",
    });
  };

  return (
    <>
      <nav className="w-full flex flex-row justify-start items-start h-12 bg-stone-50 dark:bg-neutral-800 dark:text-white group/scroll">
        <section className="h-full flex-grow overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover/scroll:scrollbar-thumb-black/25 dark:group-hover/scroll:scrollbar-thumb-white/25">
          <Tabs />
        </section>
        <section className="h-10 flex-grow-0 flex flex-row justify-start items-center gap-1 px-4 border-b bg-stone-50 dark:bg-neutral-900 border-b-border dark:border-b-border-dark">
          <ClickableIcon
            className="hover:dark:bg-transparent hover:bg-transparent hover:text-yellow-600"
            icon="plus"
            onClick={() => addTab()}
            tooltip="New query"
            tooltipPlacement="bottom"
            shortcut="CmdOrCtrl+N"
          />
          {activeTabId && (
            <>
              <ClickableIcon
                className={classNames(
                  "hover:dark:bg-transparent hover:bg-transparent hover:text-yellow-600",
                  "text-stone-700 dark:text-stone-300",
                  { "cursor-not-allowed": !activeConnectionId }
                )}
                disabled={!activeConnectionId}
                icon="play"
                onClick={onClickRunQuery}
                size={20}
                tooltip="Run query"
                tooltipPlacement="bottom"
                shortcut="CmdOrCtrl+R"
              />

              <ClickableIcon
                className={classNames(
                  "hover:dark:bg-transparent hover:bg-transparent hover:text-yellow-600",
                  "text-stone-600 dark:text-stone-400"
                )}
                icon="floppy-disk"
                onClick={handleOnClickSave}
                size={16}
                tooltip="Save query"
                tooltipPlacement="bottom"
                shortcut="CmdOrCtrl+S"
              />

              <ClickableIcon
                className={classNames(
                  "hover:dark:bg-transparent hover:bg-transparent hover:text-yellow-600",
                  "text-stone-600 dark:text-stone-400",
                  { "text-yellow-600 dark:text-yellow-500/400": showParams }
                )}
                icon="column-layout"
                onClick={onClickParameters}
                size={16}
                tooltip={showParams ? "Hide parameters" : "Show parameters"}
                tooltipPlacement="bottom"
                shortcut="alt+Shift+P"
              />
            </>
          )}
        </section>
      </nav>
    </>
  );
}
