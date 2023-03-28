import { useEvent } from "../common/useEvent";

type Payload = {};

export const useRunQueryEvent = () => {
  const { emitEvent, useEventListener } = useEvent<Payload>("run-query");

  return {
    emitRunQueryEvent: emitEvent,
    useRunQueryEventListener: useEventListener,
  };
};
