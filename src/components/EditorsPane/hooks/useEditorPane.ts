import { editor, KeyCode, KeyMod } from "monaco-editor";
import { useCallback } from "react";
import { useRunQueryEvent } from "../../../events/run-query/useRunQueryEvent";
import { addAction } from "../../../lib/editor-helpers/add-action.editor.helper";
import { EditorRef } from "../components/Editor";
import { useMonacoConfigSupplier } from "./useMonacoConfigSupplier";

type Params = {
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
};

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
