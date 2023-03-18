import { Alignment, Button, Icon, Navbar } from "@blueprintjs/core";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { useTabsContext } from "../../contexts/useTabsContext";
import { getConnectionDisplay } from "../../lib/connections-helpers";
import Brand from "../Brand";
import SelectThemeButton from "./components/SelectThemeButton";
import ThemedButton from "./components/ThemedButton";
import { useConnectionsDrawerHandler } from "./hooks/useConnectionsDrawerHandler";


export default function ActionBar() {
  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionsDrawerHandler();
  const { activeConnectionId, activeConnectionDisplay } = useConnectionContext();
  const { getActiveTab, tabs, addTab, removeTab, setActiveTabId: setActiveTab } = useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", name: "", icon: "console" };

  return (<>
    <Navbar className="bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <Navbar.Group align={Alignment.LEFT}>
        <div className="flex flex-row justify-start items-center mr-1 gap-2">
          <Brand className="text-lg" />
          <div>
            {tabs.map((tab) => (
              <Button
                disabled={tab.id === activeTab.id}
                icon={tab.icon}
                key={tab.name}
                onClick={() => setActiveTab(tab.id)}
                rightIcon={tab.closeable ? <Icon icon="cross" onClick={() => removeTab(tab.id)} /> : undefined}
                text={tab.name}
              />
            ))}
            <Button icon="plus" onClick={() => addTab()} />
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
