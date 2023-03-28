import { useState } from "react";
import { useCloseTabEvent } from "../../../events/close-tab/useCloseTabEvent";
import { usePreventCloseTabEvent } from "../../../events/prevent-close-tab/useClosingEvent";
import { useSaveQuery } from "../../../events/save-query/useSaveQuery";
import { Tab } from "../../../lib/tabs-handler";

export const useCloseDialog = () => {
  const [saveQuery] = useSaveQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [tabToBeClosed, setTabToBeClosed] = useState<Tab | undefined>();
  const { emitCloseTabEvent } = useCloseTabEvent();

  const { usePreventCloseTabEventListener } = usePreventCloseTabEvent();
  usePreventCloseTabEventListener((event) => {
    setTabToBeClosed(event.payload.tabToClose);
    setIsOpen(true);
  }, []);

  const handleOnClickDontSave = () => {
    if (tabToBeClosed) {
      emitCloseTabEvent({ tab: tabToBeClosed, force: true });
    }
    handleOnClose();
  };

  const handleOnClickSave = () => {
    if (tabToBeClosed) {
      saveQuery(tabToBeClosed);
      emitCloseTabEvent({ tab: tabToBeClosed, force: true });
      handleOnClose();
    }
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return {
    handleOnClickDontSave,
    handleOnClickSave,
    handleOnClose,
    isOpen,
    tabToBeClosed,
  };
};
