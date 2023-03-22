import { Allotment } from "allotment";
import ActionBar from "../ActionBar";
import EditorsPane from "../EditorsPane";
import Result from "../Result";
import ConsoleActionBar from "./components/ConsoleActionBar";
import { useConsole } from "./useConsole";

export default function Console() {

  const {
    handleOnClickRunQuery,
    showParams,
    toggleShowParams
  } = useConsole();

  return <>
    <Allotment vertical>
      <Allotment.Pane maxSize={80} minSize={80}>
        <ActionBar />
        <ConsoleActionBar
          onClickRunQuery={handleOnClickRunQuery}
          onClickParameters={toggleShowParams}
          showParams={showParams}
        />
      </Allotment.Pane>
      <Allotment.Pane>
        <EditorsPane showParams={showParams} />
      </Allotment.Pane>
      <Allotment.Pane >
        <div className="h-full dark:bg-neutral-800 dark:text-gray-100">
          <Result />
        </div>
      </Allotment.Pane>
    </Allotment>
  </>
}
