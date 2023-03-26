import { EventCallback } from "@tauri-apps/api/event";
import { DependencyList } from "react";
import { useEmit, useListen } from "../common";

const EVENT_NAME = "save-query";

export const useSaveQueryEvent = () => {
  const [emitSaveQueryEvent] = useEmit({ eventName: EVENT_NAME });

  return {
    emitSaveQueryEvent,
    useSaveQueryEventListen: (
      handler: EventCallback<void>,
      dependencies: DependencyList
    ) => useListen({ eventName: EVENT_NAME, handler, dependencies }),
  };
};
