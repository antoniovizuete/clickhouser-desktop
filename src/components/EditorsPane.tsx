import { Allotment } from "allotment";
import { useEditorsPane } from "../hooks/useEditorsPane";
import { Connection } from "../lib/clickhouse-clients";
import Editor, { EditorRef } from "./Editor";

export type OnExecuteQueryParams = {
  query: string | undefined;
  params: string | undefined;
  connection: Connection | undefined;
}

type Props = {
  onExecuteQuery: (params: OnExecuteQueryParams) => void;
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
}

const EditorsPane = (({ onExecuteQuery, jsonEditorRef, sqlEditorRef }: Props) => {
  const { handleEditorDidMount } = useEditorsPane({ onExecuteQuery, jsonEditorRef, sqlEditorRef });

  return (<Allotment>
    <Allotment.Pane>
      <Editor
        ref={sqlEditorRef}
        defaultValue="SELECT * FROM table"
        language="sql"
        onMount={handleEditorDidMount}
      />
    </Allotment.Pane>
    <Allotment.Pane>
      <Editor
        ref={jsonEditorRef}
        defaultValue='{"key": "value"}'
        language="json"
        onMount={handleEditorDidMount}
      />
    </Allotment.Pane>
  </Allotment>

  )
});

export default EditorsPane;
