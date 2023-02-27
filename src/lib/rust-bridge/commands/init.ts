import { invoke } from "@tauri-apps/api/tauri";
import { fromStringToRustBridgeError, RustBridgeError } from "../errors";
import { Result } from "../types";

export const init = async (
  passphrase: string
): Promise<Result<boolean, RustBridgeError>> => {
  try {
    await invoke<void>("init_db", { passphrase });
    return new Result({ result: true });
  } catch (e) {
    const error = fromStringToRustBridgeError(e as string);
    return new Result({ error });
  }
};
