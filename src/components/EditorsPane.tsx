import { Allotment } from "allotment";
import { useEditorsPane } from "../hooks/useEditorsPane";
import Editor, { EditorRef } from "./Editor";

export type OnExecuteQueryParams = {
  query: string | undefined;
  params: string | undefined;
}

type Props = {
  onExecuteQuery: (params: OnExecuteQueryParams) => void;
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
}

const EditorsPane = (({ onExecuteQuery, jsonEditorRef, sqlEditorRef }: Props) => {
  useEditorsPane({ onExecuteQuery, jsonEditorRef, sqlEditorRef });

  return (<Allotment>
    <Allotment.Pane>
      <Editor
        ref={sqlEditorRef}
        defaultValue="SELECT * FROM table"
        language="sql"
      />
    </Allotment.Pane>
    <Allotment.Pane>
      <Editor
        ref={jsonEditorRef}
        defaultValue='{"key": "value"}'
        language="json"
      />
    </Allotment.Pane>
  </Allotment>

  )
});

export default EditorsPane;
