import { useEvent } from "../common/useEvent";

export const useSavedQueryEvent = () => {
  const { emitEvent, useEventListener } = useEvent<void>("saved-query");

  return {
    emitSavedQueryEvent: emitEvent,
    useSavedQueryEventListener: useEventListener,
  };
};
