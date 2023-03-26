import { EventCallback, listen, UnlistenFn } from "@tauri-apps/api/event";
import { DependencyList, useEffect } from "react";

type ListenHookParams<T> = {
  eventName: string;
  handler: EventCallback<T>;
  dependencies?: DependencyList;
};

export const useListen = <T>({
  eventName,
  handler,
  dependencies,
}: ListenHookParams<T>) => {
  useEffect(() => {
    let unlisten: UnlistenFn;
    (async () => {
      unlisten = await listen(eventName, handler);
    })();
    return () => {
      unlisten?.();
    };
  }, dependencies);
};
