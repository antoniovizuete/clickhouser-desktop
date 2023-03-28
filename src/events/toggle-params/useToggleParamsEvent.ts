import { useEvent } from "../common/useEvent";

export const useToggleParamsEvent = () => {
  const { emitEvent, useEventListener } = useEvent<void>("toggle-params");

  return {
    emitToggleParamsEvent: emitEvent,
    useToggleParamsEventListener: useEventListener,
  };
};
