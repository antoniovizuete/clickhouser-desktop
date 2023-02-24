import { editor, IDisposable, KeyCode, KeyMod } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { OnExecuteQueryParams } from "..";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { useMonacoConfigSupplier } from "../../../hooks/useMonacoConfigSupplier";
import { Connection } from "../../../lib/clickhouse-clients";
import { addAction } from "../../../lib/editor-helpers/add-action.editor.helper";
import { EditorRef } from "../components/Editor";

type Params = {
  onExecuteQuery: (params: OnExecuteQueryParams) => void;
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

export const useEditorsPane = ({
  onExecuteQuery,
  sqlEditorRef,
  jsonEditorRef,
}: Params) => {
  const { activeConnectionId, getActiveConnection } = useConnectionContext();
  const [disposables, setDisposables] = useState<(IDisposable | undefined)[]>(
    []
  );

  useMonacoConfigSupplier({
    jsonParams: jsonEditorRef.current?.getValue() ?? "{}",
  });

  useEffect(() => {
    disposables.forEach((disposable) => disposable?.dispose());
    const newAction = getExecuteQueryAction(
      onExecuteQuery,
      sqlEditorRef,
      jsonEditorRef,
      getActiveConnection()
    );

    if (sqlEditorRef.current) {
      addAction(sqlEditorRef.current.getEditor(), newAction);
    }
    if (jsonEditorRef.current) {
      addAction(jsonEditorRef.current.getEditor(), newAction);
    }
  }, [sqlEditorRef, jsonEditorRef, activeConnectionId]);

  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      disposables.push(
        addAction(
          editor,
          getExecuteQueryAction(onExecuteQuery, sqlEditorRef, jsonEditorRef)
        )
      );
    },
    [onExecuteQuery, sqlEditorRef.current, jsonEditorRef.current]
  );

  return {
    sqlEditorRef,
    jsonEditorRef,
    handleEditorDidMount,
  };
};
