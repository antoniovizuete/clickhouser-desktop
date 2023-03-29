import { type } from "@tauri-apps/api/os";

const isDarwin = async () => (await type()) === "Darwin";

const CMD_KEY_MACOS = "⌘";
const OPTION_KEY_MACOS = "⌥";
const CONTROL_KEY_MACOS = "⌃";
const SHIFT_KEY_MACOS = "⇧";
const CTRL_KEY = "ctrl";
const ALT_KEY = "alt";
const SHIFT_KEY = "shift";

type MacOsKeys =
  | typeof CMD_KEY_MACOS
  | typeof OPTION_KEY_MACOS
  | typeof CONTROL_KEY_MACOS
  | typeof SHIFT_KEY_MACOS;

type NonMacOsKeys = typeof CTRL_KEY | typeof ALT_KEY | typeof SHIFT_KEY;

const macosMapping: Record<string, MacOsKeys> = {
  commandorcontrol: CMD_KEY_MACOS,
  cmdorctrl: CMD_KEY_MACOS,
  cmd: CMD_KEY_MACOS,
  alt: OPTION_KEY_MACOS,
  option: OPTION_KEY_MACOS,
  control: CONTROL_KEY_MACOS,
  ctrl: CONTROL_KEY_MACOS,
  shift: SHIFT_KEY_MACOS,
};

const macosOrder: MacOsKeys[] = [
  SHIFT_KEY_MACOS,
  CMD_KEY_MACOS,
  OPTION_KEY_MACOS,
  CONTROL_KEY_MACOS,
];

const nonMacosMapping: Record<string, NonMacOsKeys> = {
  commandorcontrol: CTRL_KEY,
  cmdorctrl: CTRL_KEY,
  cmd: CTRL_KEY,
  alt: ALT_KEY,
  option: ALT_KEY,
  control: CTRL_KEY,
  ctrl: CTRL_KEY,
  shift: SHIFT_KEY,
};

const nonMacosOrder: NonMacOsKeys[] = [CTRL_KEY, ALT_KEY, SHIFT_KEY];

export const pretifyShortcut = async (keystroke: string) => {
  const isMac = await isDarwin();
  return keystroke
    .split("+")
    .map((k) => {
      const mapping = isMac ? macosMapping : nonMacosMapping;
      const order = isMac ? macosOrder : nonMacosOrder;
      const key = mapping[k.toLowerCase()] || k;
      const orderIndex = order.findIndex((o) => o === key);
      return {
        key,
        order: orderIndex === -1 ? 999 : orderIndex,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map((k) => k.key)
    .join("");
};
