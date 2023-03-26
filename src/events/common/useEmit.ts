import { emit } from "@tauri-apps/api/event";

type EmitHookParams = {
  eventName: string;
};

type EmitHookReturn<T> = [(payload: T) => void];

export const useEmit = <T>({
  eventName,
}: EmitHookParams): EmitHookReturn<T> => {
  return [(payload: T) => emit(eventName, payload)];
};
