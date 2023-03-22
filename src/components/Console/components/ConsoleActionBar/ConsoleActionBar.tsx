import { Button } from "@blueprintjs/core";
import { useConnectionContext } from "../../../../contexts/useConnectionContext";
import { useTabsContext } from "../../../../contexts/useTabsContext";
import { useSaveQuery } from "../../../../hooks/useSaveQuery";
import { Tab } from "../../../../lib/tabs-handler";
import ThemedButton from "../../../core/ThemedButton";

type ConsoleActionBarProps = {
  onClickRunQuery: () => void;
  onClickParameters: () => void;
  showParams: boolean;
}

export default function ConsoleActionBar({ onClickRunQuery, onClickParameters, showParams }: ConsoleActionBarProps) {
  const { activeConnectionId } = useConnectionContext();
  const { getActiveTab, sqlEditorRef, jsonEditorRef } = useTabsContext();
  const [saveQuery] = useSaveQuery()

  const handleOnClickSave = async () => {
    const tab = getActiveTab();

    saveQuery({
      ...tab || {} as Tab,
      sql: sqlEditorRef.current?.getValue() ?? "",
      params: jsonEditorRef.current?.getValue() ?? "",
    });
  }

  return (
    <nav className="mx-4 selection: h-10 flex flex-row justify-between items-center bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <section>

      </section>
      <section className="flex flex-row justify-start items-center gap-1">
        <Button
          icon="play"
          intent="warning"
          aria-label="Run query"
          onClick={onClickRunQuery}
          disabled={!activeConnectionId}
        >Run Query</Button>
        <ThemedButton
          action={handleOnClickSave}
          icon="floppy-disk"
        >Save Query</ThemedButton>
        <ThemedButton
          action={onClickParameters}
          icon={showParams ? "chevron-right" : "chevron-left"}
        />

      </section>
    </nav>
  )
}
