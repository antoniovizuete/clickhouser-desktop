import { deleteDb } from "./commands/deleteDb";
import { init } from "./commands/init";
import { isFirstTime } from "./commands/isFirstTime";

export const RustBridge = {
  init,
  isFirstTime,
  deleteDb,
};
