import { Allotment } from "allotment";
import { useTabsContext } from "../../contexts/useTabsContext";
import EditorsPane from "../EditorsPane";
import Result from "../Result";
import ActionBar from "./components/ActionBar";
import { useConsole } from "./useConsole";

export default function Console() {
  const { activeTabId } = useTabsContext();
  const { handleOnClickRunQuery, showParams, toggleShowParams } = useConsole();

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane
          className="bg-slate-50 dark:bg-neutral-800"
          maxSize={46}
          minSize={46}
        >
          <ActionBar
            onClickRunQuery={handleOnClickRunQuery}
            onClickParameters={toggleShowParams}
            showParams={showParams}
          />
        </Allotment.Pane>
        <Allotment.Pane
          visible={!!activeTabId}
          preferredSize="50%"
          minSize={128}
        >
          <EditorsPane showParams={showParams} />
        </Allotment.Pane>
        <Allotment.Pane preferredSize="50%">
          <div className="h-full dark:bg-neutral-800 dark:text-gray-100">
            <Result />
          </div>
        </Allotment.Pane>
      </Allotment>
    </>
  );
}
