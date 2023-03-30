import { useTabsContext } from "../../../contexts/useTabsContext";
import { useCloseTabEvent } from "../../../events/close-tab/useCloseTabEvent";
import { Tab } from "../../../lib/tabs-handler";
import TabUi from "./TabUi";

export default function Tabs() {
  const { getActiveTab, tabs, setActiveTabId, addTab } = useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", name: "", icon: "console" };
  const { emitCloseTabEvent } = useCloseTabEvent();

  const handleOnClickCloseTab = (tab: Tab) => {
    emitCloseTabEvent({ tab });
  };

  return (
    <div className="h-full flex flex-row justify-start items-center select-none">
      <div className="h-full flex flex-row justify-start items-end divide-x divide-border dark:divide-border-dark">
        {tabs.map((tab, i, arr) => (
          <TabUi
            key={`${tab.id}${tab.touched}`}
            isActive={tab.id === activeTab.id}
            isLast={i === arr.length - 1}
            isTouched={tab.touched}
            setActiveTabId={setActiveTabId}
            onClickCloseTab={handleOnClickCloseTab}
            tab={tab}
          />
        ))}
      </div>
      <div
        className="h-full flex-grow border-b border-b-border dark:border-b-border-dark bg-stone-50 dark:bg-neutral-900"
        onDoubleClick={() => addTab()}
      />
    </div>
  );
}
