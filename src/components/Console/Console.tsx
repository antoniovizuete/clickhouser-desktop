import { Allotment } from "allotment";
import EditorsPane from "../EditorsPane";
import Footer from "../Footer";
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
      <Allotment.Pane maxSize={50} minSize={50} >
        <ConsoleActionBar
          onClickRunQuery={handleOnClickRunQuery}
          onClickParameters={toggleShowParams}
          showParams={showParams}
        />
      </Allotment.Pane>
      <Allotment.Pane className="!border-l-0">
        <EditorsPane showParams={showParams} />
      </Allotment.Pane>
      <Allotment.Pane >
        <div className="h-full dark:bg-neutral-800 dark:text-gray-100">
          <Result />
        </div>
      </Allotment.Pane>
      <Allotment.Pane maxSize={24} minSize={24} className="p-0">
        <Footer />
      </Allotment.Pane>
    </Allotment>
  </>
}
