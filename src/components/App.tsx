import { Allotment } from "allotment";
import { useApp } from "../hooks/useApp";
import ActionBar from "./ActionBar";
import EditorsPane from "./EditorsPane";
import Footer from "./Footer";
import Result from "./Result";

type Props = {
  isFirstTime: boolean;
}

export default function App({ isFirstTime }: Props) {

  const {
    error,
    FirstTimeDialog,
    handelOnExecuteQuery,
    handleOnClickRunQuery,
    jsonEditorRef,
    loading,
    openFirstTimeDialog,
    result,
    sqlEditorRef,
  } = useApp();

  if (isFirstTime) {
    openFirstTimeDialog();
  }

  return <>
    <Allotment vertical>
      <Allotment.Pane maxSize={48} minSize={48} >
        <ActionBar onClickRunQuery={handleOnClickRunQuery} />
      </Allotment.Pane>
      <Allotment.Pane>
        <EditorsPane jsonEditorRef={jsonEditorRef} sqlEditorRef={sqlEditorRef} onExecuteQuery={handelOnExecuteQuery} />
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
    {FirstTimeDialog}
  </>
}
