import { Allotment } from "allotment";
import { useCallback } from "react";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { useApp } from "../hooks/useApp";
import ActionBar from "./ActionBar";
import EditorsPane, { OnExecuteQueryParams } from "./EditorsPane";
import Footer from "./Footer";
import Result from "./Result";

export default function App() {
  const { activeConnectionId, getActiveConnection } = useConnectionContext();
  const { executeQuery, error, loading, result, sqlEditorRef, jsonEditorRef } = useApp()

  const handelOnExecuteQuery = useCallback((param: OnExecuteQueryParams) => {
    executeQuery(param)
  }, [executeQuery, activeConnectionId])

  const handleOnClickRunQuery = useCallback(() => {
    executeQuery({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
      connection: getActiveConnection()
    })
  }, [sqlEditorRef.current, jsonEditorRef.current, executeQuery, activeConnectionId])

  return <Allotment vertical>
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
}
