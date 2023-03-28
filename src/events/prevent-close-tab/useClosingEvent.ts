import { Tab } from "../../lib/tabs-handler";
import { useEvent } from "../common/useEvent";

export type PreventCloseTabPayload = {
  tabToClose?: Tab;
};

export const usePreventCloseTabEvent = () => {
  const { emitEvent, useEventListener } =
    useEvent<PreventCloseTabPayload>("closing-tab");

  return {
    emitPreventCloseTabEvent: emitEvent,
    usePreventCloseTabEventListener: useEventListener,
  };
};
