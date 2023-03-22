import { Button, Classes, Dialog } from '@blueprintjs/core';
import { useState } from 'react';
import { useTabsContext } from '../../../contexts/useTabsContext';
import { useThemeContext } from '../../../contexts/useThemeContext';
import { useSaveQuery } from '../../../hooks/useSaveQuery';
import { Tab } from '../../../lib/tabs-handler';
import ClickableIcon from '../../core/ClickableIcon';
import TabUi from './TabUi';

export default function Tabs() {
  const { getActiveTab, tabs, addTab, removeTab, setActiveTabId } = useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", name: "", icon: "console" };
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [tabToRemove, setTabToRemove] = useState<Tab | undefined>();
  const { bpTheme } = useThemeContext();
  const [saveQuery] = useSaveQuery();

  const handleOnClickCloseTab = (tab: Tab) => {
    if (tab.touched) {
      setTabToRemove(tab);
      setIsAlertOpen(true);
    } else {
      removeTab(tab.id);
    }
  }

  const handleOnClickDontSave = () => {
    if (tabToRemove) {
      removeTab(tabToRemove.id);
    }
    closeAlert();
  }

  const handleOnClickSave = () => {
    if (tabToRemove) {
      saveQuery(tabToRemove);
      removeTab(tabToRemove.id);
      closeAlert();
    }
  }


  const closeAlert = () => {
    setIsAlertOpen(false);
  }

  return (<>
    <div className="h-full flex flex-row justify-start items-center">
      <div className='h-full flex flex-row justify-start items-end divide-x dark:divide-stone-600'>
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
      <div className='h-full flex flex-row justify-start items-center px-2 border-b border-b-stone-600'>
        <ClickableIcon icon="plus" onClick={() => addTab()} />
      </div>
      <div className="h-full flex-grow border-b border-b-stone-600"></div>
    </div>
    <Dialog
      icon="warning-sign"
      className={bpTheme}
      isOpen={isAlertOpen}
      onClose={closeAlert}
      title="Unsaved query"
    ><div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-3`}>
        <div><span className='font-bold'>{tabToRemove?.name}</span> has unsaved changes. Your changes will be lost if you close this tab without saving it.</div>

        <div>Are you sure you want to close this tab?</div>
      </div><div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleOnClickDontSave} type="button">Don't save</Button>
          <Button onClick={closeAlert} type={"button"}>
            Cancel
          </Button>
          <Button intent="warning" type="submit" onClick={handleOnClickSave}>
            Save
          </Button>
        </div>
      </div></Dialog>
  </>)
}
