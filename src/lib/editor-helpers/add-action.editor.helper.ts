import { editor, IDisposable } from "monaco-editor/esm/vs/editor/editor.api";

export function addAction(
  editor: editor.IStandaloneCodeEditor | undefined,
  action: editor.IActionDescriptor
): IDisposable | undefined {
  if (!editor) return;
  if (editor.getAction(action.id)) {
    editor.getAction(action.id).run = action.run as editor.IEditorAction["run"];
    return;
  }
  return editor.addAction(action);
}
