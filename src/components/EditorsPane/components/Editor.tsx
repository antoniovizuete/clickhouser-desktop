import MonacoEditor from "@monaco-editor/react";
import {
  editor, IDisposable
} from "monaco-editor/esm/vs/editor/editor.api";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useThemeContext } from "../../../contexts/useThemeContext";

type EditorProps = {
  defaultValue?: string;
  language: "sql" | "json";
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
  onChange?: () => void;
  path: string;
};

export type EditorRef = {
  getValue: () => string | undefined;
  addAction: (action: editor.IActionDescriptor) => IDisposable | undefined;
  getEditor: () => editor.IStandaloneCodeEditor | undefined;
};

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { defaultValue, language, onChange, onMount, path } =
    props;

  const [internalDefaultValue, setInternalDefaultValue] = useState(defaultValue);

  useEffect(() => {
    setInternalDefaultValue(defaultValue);
  }, [defaultValue])

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    onMount?.(editor);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue(),
    addAction: (action: editor.IActionDescriptor) =>
      editorRef.current?.addAction(action),
    getEditor: () => editorRef.current,
  }));

  const { theme } = useThemeContext();

  const handleOnChange = (code?: string) => {
    onChange?.();
    console.log("onChange Editor", code)
  };

  return (
    <div className="dark:bg-[rgb(30,30,30)] dark:text-neutral-400 h-full">
      <MonacoEditor
        theme={theme === "dark" ? "vs-dark" : "light"}
        className="mb-6"
        height="100%"
        width="100%"
        defaultValue={internalDefaultValue}
        language={language}
        onMount={handleOnMount}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onChange={handleOnChange}
        path={path}
      />
    </div>
  );
});
export default Editor;
