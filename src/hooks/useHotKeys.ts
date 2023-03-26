import {
  isRegistered,
  register as tauriRegister,
} from "@tauri-apps/api/globalShortcut";
import { useRunQuery } from "../events/run-query/useRunQuery";

export const useHotKeys = () => {
  const { runQuery } = useRunQuery();

  const register = async (key: string, callback: () => void) => {
    if (await isRegistered(key)) return;
    tauriRegister(key, callback);
  };

  const registerGlobalHotKeys = async () => {
    await register("CommandOrControl+Enter", () => {
      runQuery();
    });
  };

  return { registerGlobalHotKeys };
};
