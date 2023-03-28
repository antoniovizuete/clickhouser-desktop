import { useEvent } from "../common/useEvent";

export const useNewQueryEvent = () => {
  const { emitEvent, useEventListener } = useEvent<void>("new-query");

  return {
    emitNewQueryEvent: emitEvent,
    useNewQueryEventListener: useEventListener,
  };
};
