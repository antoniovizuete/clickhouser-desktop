import { Alignment, Navbar } from "@blueprintjs/core";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { getConnectionDisplay } from "../../lib/connections-helpers";
import Brand from "../Brand";
import SelectThemeButton from "./components/SelectThemeButton";
import Tabs from "./components/Tabs";
import ThemedButton from "./components/ThemedButton";
import { useConnectionsDrawerHandler } from "./hooks/useConnectionsDrawerHandler";


export default function ActionBar() {
  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionsDrawerHandler();
  const { activeConnectionId, activeConnectionDisplay } = useConnectionContext();

  return (<>
    <Navbar className="bg-stone-50 dark:bg-neutral-900 dark:text-white border-b border-b-stone-500">
      <Navbar.Group className="flex flex-row justify-start gap-4" align={Alignment.LEFT}>
        <Brand className="text-lg" />
        <Tabs />
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
