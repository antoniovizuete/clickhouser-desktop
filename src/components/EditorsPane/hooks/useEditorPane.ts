import { editor, KeyCode, KeyMod } from "monaco-editor";
import { useCallback } from "react";
import { useToggleParamsEvent } from "../../../events/toggle-params/useToggleParamsEvent";
import {
  ToggleSidebarEventVariants,
  useToggleSidebarEvent,
} from "../../../events/toggle-sidebar/useToggleSidebarEvent";
import { EditorRef } from "../components/Editor";
import { useMonacoConfigSupplier } from "./useMonacoConfigSupplier";

type Params = {
  sqlEditorRef: React.RefObject<EditorRef>;
  jsonEditorRef: React.RefObject<EditorRef>;
};

export const useEditorsPane = ({ jsonEditorRef }: Params) => {
  const { emitToggleSidebarEvent } = useToggleSidebarEvent();
  const { emitToggleParamsEvent } = useToggleParamsEvent();

  useMonacoConfigSupplier({
    jsonParams: jsonEditorRef.current?.getValue() ?? "{}",
  });

  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      editor.addCommand(KeyMod.Alt | KeyMod.Shift | KeyCode.KeyC, () => {
        emitToggleSidebarEvent(ToggleSidebarEventVariants.CONNECTIONS);
      });
      editor.addCommand(KeyMod.Alt | KeyMod.Shift | KeyCode.KeyQ, () => {
        emitToggleSidebarEvent(ToggleSidebarEventVariants.QUERIES);
      });
      editor.addAction({
        id: "show-parameters",
        label: "Show/Hide parameters",
        keybindings: [KeyMod.Alt | KeyMod.Shift | KeyCode.KeyP],
        run: () => {
          emitToggleParamsEvent();
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
    },
    []
  );

  return {
    handleEditorDidMount,
  };
};
