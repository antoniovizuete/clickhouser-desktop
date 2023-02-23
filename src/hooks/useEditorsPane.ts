import { editor, KeyCode, KeyMod } from "monaco-editor";
import { useEffect } from "react";
import { EditorRef } from "../components/Editor";
import { OnExecuteQueryParams } from "../components/EditorsPane";
import { addAction } from "../lib/editor-helpers/add-action.editor.helper";
import { useMonacoConfigSupplier } from "./useMonacoConfigSupplier";

type Params = {
  onExecuteQuery: (params: OnExecuteQueryParams) => void;
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
};

const getExecuteQueryAction = (
  onExecuteQuery: (params: OnExecuteQueryParams) => void,
  sqlEditorRef: React.MutableRefObject<EditorRef | null>,
  jsonEditorRef: React.MutableRefObject<EditorRef | null>
): editor.IActionDescriptor => ({
  id: "execute-query",
  label: "Execute query",
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  run: () => {
    onExecuteQuery({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
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
  useMonacoConfigSupplier({
    jsonParams: jsonEditorRef.current?.getValue() ?? "{}",
  });

  useEffect(() => {
    const newAction = getExecuteQueryAction(
      onExecuteQuery,
      sqlEditorRef,
      jsonEditorRef
    );

    if (sqlEditorRef.current) {
      addAction(sqlEditorRef.current.getEditor(), newAction);
    }
    if (jsonEditorRef.current) {
      addAction(jsonEditorRef.current.getEditor(), newAction);
    }
  }, [sqlEditorRef.current, jsonEditorRef.current, onExecuteQuery]);

  return {
    sqlEditorRef,
    jsonEditorRef,
  };
};
