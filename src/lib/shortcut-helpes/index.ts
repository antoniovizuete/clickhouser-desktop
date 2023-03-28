import { type } from "@tauri-apps/api/os";

const isDarwin = async () => (await type()) === "Darwin";

const macosMapping: Record<string, string> = {
  commandorcontrol: "⌘",
  cmdorctrl: "⌘",
  cmd: "⌘",
  alt: "⌥",
  option: "⌥",
  control: "⌃",
  ctrl: "⌃",
  shift: "⇧",
};

const nonMacosMapping: Record<string, string> = {
  commandorcontrol: "ctrl",
  cmdorctrl: "ctrl",
  cmd: "ctrl",
  alt: "alt",
  option: "alt",
  control: "ctrl",
  ctrl: "ctrl",
  shift: "shift",
};

export const pretifyShortcut = async (keystroke: string) => {
  const isMac = await isDarwin();
  return keystroke
    .split("+")
    .map((k) => {
      const mapping = isMac ? macosMapping : nonMacosMapping;
      return mapping[k.toLowerCase()] || k;
    })
    .join("");
};
