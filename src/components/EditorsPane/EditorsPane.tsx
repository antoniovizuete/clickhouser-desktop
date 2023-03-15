import { Allotment } from "allotment";
import { Connection } from "../../lib/clickhouse-clients";
import Editor, { EditorRef } from "./components/Editor";
import { useEditorsPane } from "./hooks/useEditorsPane";

export type OnExecuteQueryParams = {
  query: string | undefined;
  params: string | undefined;
  connection: Connection | undefined;
}

type Props = {
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
}

const EditorsPane = (({ jsonEditorRef, sqlEditorRef }: Props) => {
  const { handleEditorDidMount } = useEditorsPane({ jsonEditorRef, sqlEditorRef });

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
