import { Tab } from "../../lib/tabs-handler";
import { useEvent } from "../common/useEvent";

export type CloseTabPayload = {
  tab?: Tab;
  force?: boolean;
};

export const useCloseTabEvent = () => {
  const { emitEvent, useEventListener } =
    useEvent<CloseTabPayload>("close-tab");

  return {
    emitCloseTabEvent: emitEvent,
    useCloseTabEventListener: useEventListener,
  };
};
