import { useEvent } from "../common/useEvent";

export const useSaveQueryEvent = () => {
  const { emitEvent, useEventListener } = useEvent<void>("save-query");

  return {
    emitSaveQueryEvent: emitEvent,
    useSaveQueryEventListener: useEventListener,
  };
};
