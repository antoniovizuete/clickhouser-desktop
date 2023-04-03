import { Icon } from "@blueprintjs/core";
import {
  CMD_KEY_MACOS,
  OPTION_KEY_MACOS,
  SHIFT_KEY_MACOS,
} from "../../../lib/shortcut-helpes";
import Brand from "../../core/Brand";
import Shortcut from "./Shortcut";

export default function Landing() {
  return (
    <main className="flex flex-col justify-center items-center h-full gap-2">
      <Icon
        icon="search"
        iconSize={120}
        className={"text-stone-300 dark:text-stone-700"}
      />
      <Brand className="text-4xl" />
      <h2 className="dark:text-gray-400 mb-10">ClickHouse query runner</h2>
      <ul className="w-full flex flex-col justify-center items-center gap-4">
        <Shortcut shortcut={[CMD_KEY_MACOS, "N"]}>New query</Shortcut>
        <Shortcut shortcut={[OPTION_KEY_MACOS, SHIFT_KEY_MACOS, "C"]}>
          Show/Hide connections
        </Shortcut>
        <Shortcut shortcut={[OPTION_KEY_MACOS, SHIFT_KEY_MACOS, "Q"]}>
          Show/Hide saved queries
        </Shortcut>
      </ul>
    </main>
  );
}
