import { useConnectionContext } from "../../contexts/useConnectionContext";
import { getConnectionDisplay } from "../../lib/connections-helpers";
import ThemedButton from "../core/ThemedButton";
import SelectThemeButton from "./components/SelectThemeButton";
import Tabs from "./components/Tabs";
import { useConnectionsDrawerHandler } from "./hooks/useConnectionsDrawerHandler";


export default function ActionBar() {
  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionsDrawerHandler();
  const { activeConnectionId, activeConnectionDisplay } = useConnectionContext();

  return (<>
    <nav className="flex flex-row h-10 bg-stone-50 dark:bg-neutral-900 dark:text-white ">
      <section className="flex-grow">
        <Tabs />
      </section>
      <section
        className="flex-grow-0 flex flex-row justify-start items-center gap-1 pr-4 border-b border-b-border dark:border-b-border-dark"
      >
        <ThemedButton
          icon="data-connection"
          action={openConnectionDrawer}
          grayed={!activeConnectionId}
        >
          {activeConnectionDisplay ? getConnectionDisplay({ connection: activeConnectionDisplay }) : "Select connection"}
        </ThemedButton>
        <SelectThemeButton />
      </section>
    </nav>
    {ConnectionsDrawer}
  </>)
}
