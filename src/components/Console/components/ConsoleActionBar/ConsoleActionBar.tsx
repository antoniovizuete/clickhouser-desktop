import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { useConnectionContext } from "../../../../contexts/useConnectionContext";
import { useTabsContext } from "../../../../contexts/useTabsContext";
import EditableSpan from "../../../core/EditableSpan";
import ThemedButton from "../../../core/ThemedButton";

type ConsoleActionBarProps = {
  onClickRunQuery: () => void;
  onClickParameters: () => void;
  showParams: boolean;
}

export default function ConsoleActionBar({ onClickRunQuery, onClickParameters, showParams }: ConsoleActionBarProps) {
  const { activeConnectionId } = useConnectionContext();
  const { getActiveTab, renameTab } = useTabsContext();

  const name = getActiveTab()?.name;

  return (
    <Navbar className="bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <Navbar.Group className="w-1/2" align={Alignment.LEFT}>
        <EditableSpan onBlur={(e) => renameTab(e.currentTarget.innerText)}>{name}</EditableSpan>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <div className="flex flex-row justify-start items-center gap-1">
          <Button
            icon="play"
            intent="warning"
            aria-label="Run query"
            onClick={onClickRunQuery}
            disabled={!activeConnectionId}
          >Run Query</Button>
          <ThemedButton icon="code" action={onClickParameters}>{showParams ? "Hide " : ""}Parameters</ThemedButton>
        </div>
      </Navbar.Group>
    </Navbar>
  )
}
