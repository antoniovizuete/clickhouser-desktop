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
    console.log("useListen");
    (async () => {
      unlisten = await listen(eventName, handler);
    })();
    return () => {
      console.log("unlistening");
      unlisten?.();
    };
  }, dependencies);
};
