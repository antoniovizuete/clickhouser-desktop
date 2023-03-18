import { Allotment } from "allotment";
import { useTabsContext } from "../../contexts/useTabsContext";
import { Connection } from "../../lib/clickhouse-clients";
import Editor from "./components/Editor";
import { useEditorsPane } from "./hooks/useEditorsPane";

export type OnExecuteQueryParams = {
  query: string | undefined;
  params: string | undefined;
  connection: Connection | undefined;
}

const EditorsPane = (() => {
  const { getActiveTab, jsonEditorRef, sqlEditorRef } = useTabsContext();
  const { handleEditorDidMount } = useEditorsPane({ jsonEditorRef, sqlEditorRef });

  const activeTab = getActiveTab() ?? { id: "", sql: "", params: "" };

  return (<Allotment>
    <Allotment.Pane>
      <Editor
        ref={sqlEditorRef}
        defaultValue={activeTab.sql}
        language="sql"
        onMount={handleEditorDidMount}
        path={`sql-${activeTab.id}`}
      />
    </Allotment.Pane>
    <Allotment.Pane>
      <Editor
        ref={jsonEditorRef}
        defaultValue={activeTab.params}
        language="json"
        onMount={handleEditorDidMount}
        path={`params-${activeTab.id}`}
      />
    </Allotment.Pane>
  </Allotment>

  )
});

export default EditorsPane;
