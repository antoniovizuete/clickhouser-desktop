import { invoke } from "@tauri-apps/api/tauri";

export const log = (message: string) => {
  invoke("log", { message });
};
