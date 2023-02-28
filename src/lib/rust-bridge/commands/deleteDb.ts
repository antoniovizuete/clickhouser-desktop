import { invoke } from "@tauri-apps/api/tauri";
import { fromStringToRustBridgeError, RustBridgeError } from "../errors";
import { Result } from "../types";

export const deleteDb = async (): Promise<Result<boolean, RustBridgeError>> => {
  try {
    await invoke<void>("delete_db");
    console.log("Deleted db");
    return new Result({ result: true });
  } catch (e) {
    console.error("Failed to delete db", e);
    const error = fromStringToRustBridgeError(e as string);
    return new Result({ error });
  }
};
