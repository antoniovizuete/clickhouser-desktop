import { useEvent } from "../common/useEvent";

export enum ToggleSidebarEventVariants {
  QUERIES = "toggle-panel-query",
  CONNECTIONS = "toggle-panel-connection",
}

export const useToggleSidebarEvent = () => {
  const { emitEvent, useEventListener } =
    useEvent<ToggleSidebarEventVariants>("toggle-sidebar");

  return {
    emitToggleSidebarEvent: emitEvent,
    useToggleSidebarEventListener: useEventListener,
  };
};
