import { Allotment } from "allotment";
import EditorsPane from "../EditorsPane";
import Footer from "../Footer";
import Result from "../Result";
import ConsoleActionBar from "./components/ConsoleActionBar";
import { useConsole } from "./useConsole";

export default function Console() {

  const {
    handleOnClickRunQuery,
  } = useConsole();

  return <>
    <Allotment vertical>
      <Allotment.Pane maxSize={48} minSize={48} >
        <ConsoleActionBar onClickRunQuery={handleOnClickRunQuery} />
      </Allotment.Pane>
      <Allotment.Pane>
        <EditorsPane />
      </Allotment.Pane>
      <Allotment.Pane>
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
