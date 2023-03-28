import { EventCallback } from "@tauri-apps/api/event";
import { DependencyList } from "react";
import { useEmit } from "./useEmit";
import { useListen } from "./useListen";

export const useEvent = <T>(eventName: string) => {
  const [emitEvent] = useEmit<T>({ eventName });

  return {
    emitEvent,
    useEventListener: (
      handler: EventCallback<T>,
      dependencies: DependencyList
    ) => useListen({ eventName, handler, dependencies }),
  };
};
