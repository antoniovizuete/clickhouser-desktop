import { useEffect, useState } from "react";
import { pretifyShortcut } from "../lib/shortcut-helpes";

type UseShortcutOnTooltipProps = {
  shortcut?: string;
  tooltip?: string;
};

export const useShortcutOnTooltip = ({
  shortcut,
  tooltip,
}: UseShortcutOnTooltipProps) => {
  const [intenalShortcut, setIntenalShortcut] = useState<string>("");
  useEffect(() => {
    pretifyShortcut(shortcut ?? "").then((s) => setIntenalShortcut(s));
  }, [shortcut]);

  const [tooltipContent, setTooltipContent] = useState(
    `${tooltip} ${intenalShortcut ? `(${intenalShortcut})` : ""}`
  );

  useEffect(() => {
    setTooltipContent(
      `${tooltip} ${intenalShortcut ? `(${intenalShortcut})` : ""}`
    );
  }, [tooltip, intenalShortcut]);

  return tooltipContent;
};
