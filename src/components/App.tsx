import { Allotment } from "allotment";
import { useApp } from "../hooks/useApp";
import ActionBar from "./ActionBar";
import EditorsPane from "./EditorsPane";
import Footer from "./Footer";
import Result from "./Result";

export default function App() {

  const {
    error,
    handleOnClickRunQuery,
    jsonEditorRef,
    loading,
    result,
    sqlEditorRef,
  } = useApp();

  return <>
    <Allotment vertical>
      <Allotment.Pane maxSize={48} minSize={48} >
        <ActionBar onClickRunQuery={handleOnClickRunQuery} />
      </Allotment.Pane>
      <Allotment.Pane>
        <EditorsPane jsonEditorRef={jsonEditorRef} sqlEditorRef={sqlEditorRef} />
      </Allotment.Pane>
      <Allotment.Pane>
        <div className="h-full dark:bg-neutral-800 dark:text-gray-100">
          <Result result={result} error={error} loading={loading} />
        </div>
      </Allotment.Pane>
      <Allotment.Pane maxSize={24} minSize={24} className="p-0">
        <Footer result={result} />
      </Allotment.Pane>
    </Allotment>
  </>
}
