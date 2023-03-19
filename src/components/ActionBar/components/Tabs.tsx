import { useTabsContext } from '../../../contexts/useTabsContext';
import ClickableIcon from '../../core/ClickableIcon';
import TabUi from './TabUi';

export default function Tabs() {
  const { getActiveTab, tabs, addTab, removeTab, setActiveTabId } = useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", name: "", icon: "console" };

  return (<div className="flex flex-row justify-start items-end h-full">
    <div className='w-full h-full flex flex-row justify-start items-end divide-x divide-stone-500'>
      {tabs.map((tab, i, arr) => (
        <TabUi
          key={tab.id}
          isActive={tab.id === activeTab.id}
          isFirst={i === 0}
          isLast={i === arr.length - 1}
          setActiveTabId={setActiveTabId}
          removeTab={removeTab}
          tab={tab}
        />
      ))}
    </div>
    <div className='w-full h-4/5 flex flex-row justify-start items-center px-2'>
      <ClickableIcon icon="plus" onClick={() => addTab()} />
    </div>
  </div>
  )
}
