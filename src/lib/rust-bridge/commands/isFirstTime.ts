import { invoke } from "@tauri-apps/api/tauri";
import { fromStringToRustBridgeError } from "../errors";

export const isFirstTime = async (): Promise<boolean> => {
  try {
    return await invoke<boolean>("is_first_time");
  } catch (e) {
    const error = fromStringToRustBridgeError(e as string);
    return Promise.reject(error);
  }
};
