import { DroppableProvided } from "react-beautiful-dnd";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useCloseTabEvent } from "../../../events/close-tab/useCloseTabEvent";
import { Tab } from "../../../lib/tabs-handler";
import TabElement from "./TabElement";

type Props = {
  provided: DroppableProvided;
};

export default function TabList({ provided }: Props) {
  const { getActiveTab, tabs, setActiveTabId, addTab, tabListRef } =
    useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", name: "", icon: "console" };
  const { emitCloseTabEvent } = useCloseTabEvent();

  const handleOnClickCloseTab = (tab: Tab) => {
    emitCloseTabEvent({ tab });
  };

  const innerRef = (node: HTMLUListElement) => {
    tabListRef.current = node;
    provided.innerRef(node);
  };

  return (
    <div className="h-full flex flex-row justify-start items-center select-none">
      <ul
        className="h-full flex flex-row justify-start items-end divide-x divide-border dark:divide-border-dark"
        ref={innerRef}
        {...provided.droppableProps}
      >
        {tabs.map((tab, i, arr) => (
          <TabElement
            key={`${tab.id}${tab.touched}`}
            isActive={tab.id === activeTab.id}
            isLast={i === arr.length - 1}
            isTouched={tab.touched}
            setActiveTabId={setActiveTabId}
            onClickCloseTab={handleOnClickCloseTab}
            tab={tab}
            index={i}
          />
        ))}
        {provided.placeholder}
      </ul>
      <div
        className="h-full flex-grow border-b border-b-border dark:border-b-border-dark bg-stone-50 dark:bg-neutral-900"
        onDoubleClick={() => addTab()}
      />
    </div>
  );
}
