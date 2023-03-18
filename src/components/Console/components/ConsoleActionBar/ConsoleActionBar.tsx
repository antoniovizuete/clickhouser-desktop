import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { useConnectionContext } from "../../../../contexts/useConnectionContext";

type ConsoleActionBarProps = {
  onClickRunQuery: () => void;
}

export default function ConsoleActionBar({ onClickRunQuery }: ConsoleActionBarProps) {
  const { activeConnectionId } = useConnectionContext();

  return (
    <Navbar className="bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <Navbar.Group align={Alignment.LEFT}>
        <div className="flex flex-row justify-start items-center gap-1">
          <Button
            icon="play"
            intent="warning"
            aria-label="Run query"
            onClick={onClickRunQuery}
            disabled={!activeConnectionId}
          >Run Query</Button>
        </div>
      </Navbar.Group>
    </Navbar>
  )
}
