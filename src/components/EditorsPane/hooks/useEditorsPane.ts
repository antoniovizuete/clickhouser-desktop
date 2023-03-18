import { editor, KeyCode, KeyMod } from "monaco-editor";
import { useCallback } from "react";
import { OnExecuteQueryParams } from "..";
import { useMonacoConfigSupplier } from "../../../hooks/useMonacoConfigSupplier";
import { useRunQueryEvent } from "../../../hooks/useRunQueryEvent";
import { Connection } from "../../../lib/clickhouse-clients";
import { addAction } from "../../../lib/editor-helpers/add-action.editor.helper";
import { EditorRef } from "../components/Editor";

type Params = {
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
};

const getExecuteQueryAction = (
  onExecuteQuery: (params: OnExecuteQueryParams) => void,
  sqlEditorRef: React.MutableRefObject<EditorRef | null>,
  jsonEditorRef: React.MutableRefObject<EditorRef | null>,
  connection?: Connection
): editor.IActionDescriptor => ({
  id: "execute-query",
  label: "Execute query",
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  run: () => {
    onExecuteQuery({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
      connection,
    });
  },
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
});

export const useEditorsPane = ({ sqlEditorRef, jsonEditorRef }: Params) => {
  const { emitRunQueryEvent } = useRunQueryEvent();

  useMonacoConfigSupplier({
    jsonParams: jsonEditorRef.current?.getValue() ?? "{}",
  });

  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      addAction(editor, {
        id: "execute-query",
        label: "Execute query",
        keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
        run: () => {
          emitRunQueryEvent({
            query: sqlEditorRef.current?.getEditor()?.getValue() ?? "",
            params: jsonEditorRef.current?.getEditor()?.getValue() ?? "",
          });
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
    },
    [sqlEditorRef.current, jsonEditorRef.current]
  );

  return {
    handleEditorDidMount,
  };
};
