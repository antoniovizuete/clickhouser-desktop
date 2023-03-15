import { EventCallback } from "@tauri-apps/api/event";
import { DependencyList } from "react";
import { useEmit } from "./useEmit";
import { useListen } from "./useListen";

const RUN_QUERY_EVENT = "run-query";

export type RunQueryPayload = {
  query: string;
  params: string;
};

export const useRunQueryEvent = () => {
  const [emitRunQueryEvent] = useEmit({ eventName: RUN_QUERY_EVENT });

  return {
    emitRunQueryEvent,
    useRunQueryEventListen: (
      handler: EventCallback<RunQueryPayload>,
      dependencies: DependencyList
    ) => useListen({ eventName: RUN_QUERY_EVENT, handler, dependencies }),
  };
};
