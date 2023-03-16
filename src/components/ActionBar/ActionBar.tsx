import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { getConnectionDisplay } from "../../lib/connections-helpers";
import Brand from "../Brand";
import SelectThemeButton from "./components/SelectThemeButton";
import ThemedButton from "./components/ThemedButton";
import { useConnectionsDrawerHandler } from "./hooks/useConnectionsDrawerHandler";

type ActionBarProps = {
  onClickRunQuery: () => void;
}

export default function ActionBar({ onClickRunQuery }: ActionBarProps) {
  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionsDrawerHandler();
  const { activeConnectionId, activeConnectionDisplay } = useConnectionContext();


  return (<>
    <Navbar className="bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <Navbar.Group align={Alignment.LEFT}>
        <div className="flex flex-row justify-start items-center mr-1 gap-2">
          <Brand className="text-lg" />
          <div className="flex flex-row justify-start items-center gap-1">
            <Button
              icon="play"
              intent="warning"
              aria-label="Run query"
              onClick={onClickRunQuery}
              disabled={!activeConnectionId}
            />
          </div>
        </div>
      </Navbar.Group>
      <Navbar.Group
        align={Alignment.RIGHT}
        className="flex flex-row justify-start items-center gap-1"
      >
        <ThemedButton
          icon="data-connection"
          action={openConnectionDrawer}
          grayed={!activeConnectionId}
        >
          {activeConnectionDisplay ? getConnectionDisplay({ connection: activeConnectionDisplay }) : "Select connection"}
        </ThemedButton>
        <SelectThemeButton />
      </Navbar.Group>
    </Navbar>
    {ConnectionsDrawer}
  </>)
}
