import { Allotment } from "allotment";
import { useEffect, useMemo } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useMonacoConfigSupplier } from "../../hooks/useMonacoConfigSupplier";
import { Connection } from "../../lib/clickhouse-clients";
import Editor from "./components/Editor";
import EditorLabel from "./components/EditorLabel";

export type OnExecuteQueryParams = {
  query: string | undefined;
  params: string | undefined;
  connection: Connection | undefined;
};

type Props = {
  showParams: boolean;
};

export default function EditorsPane({ showParams }: Props) {
  const {
    getActiveTab,
    jsonEditorRef,
    sqlEditorRef,
    markAsChanged,
    activeTabId,
  } = useTabsContext();

  useMonacoConfigSupplier({
    jsonParams: jsonEditorRef.current?.getValue() ?? "{}",
  });

  const activeTab = useMemo(() => getActiveTab(), [activeTabId]);

  useEffect(() => {
    if (activeTab) {
      sqlEditorRef.current?.getEditor()?.setValue(activeTab.sql);
      jsonEditorRef.current?.getEditor()?.setValue(activeTab.params);
    }
  }, [activeTab]);

  return (
    <Allotment>
      <Allotment.Pane minSize={800} preferredSize="60%">
        <EditorLabel label="Query" />
        <Editor
          ref={sqlEditorRef}
          language="sql"
          onChange={markAsChanged}
          path={`sql-${activeTab?.id}`}
          touchableField="sql"
        />
      </Allotment.Pane>
      <Allotment.Pane visible={showParams} preferredSize="40%" minSize={450}>
        <EditorLabel label="Parameters" />
        <Editor
          ref={jsonEditorRef}
          language="json"
          onChange={markAsChanged}
          path={`params-${activeTab?.id}`}
          touchableField="params"
        />
      </Allotment.Pane>
    </Allotment>
  );
}
