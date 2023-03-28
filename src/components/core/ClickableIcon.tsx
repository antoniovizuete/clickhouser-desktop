import { Icon, IconName } from "@blueprintjs/core";
import { Placement, Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { pretifyShortcut } from "../../lib/shortcut-helpes";

type Props = {
  className?: string;
  disabled?: boolean;
  icon: IconName;
  onClick?: () => void;
  overrideIconOnMouseEnter?: IconName;
  shortcut?: string;
  size?: number;
  tooltip?: string;
  tooltipPlacement?: Placement;
};
export default function ClickableIcon({
  className,
  disabled,
  icon,
  onClick,
  overrideIconOnMouseEnter,
  shortcut,
  size,
  tooltip,
  tooltipPlacement,
}: Props) {
  const [iconName, setIconName] = useState(icon);
  useEffect(() => {
    setIconName(icon);
  }, [icon]);
  const [intenalShortcut, setIntenalShortcut] = useState<string>("");
  useEffect(() => {
    pretifyShortcut(shortcut ?? "").then((s) => setIntenalShortcut(s));
  }, [shortcut]);

  const [tooltipContent, setTooltipContent] = useState(
    `${tooltip} ${intenalShortcut ? `(${intenalShortcut})` : ""}`
  );

  useEffect(() => {
    console.log("internalShortcut", intenalShortcut);
    setTooltipContent(
      `${tooltip} ${intenalShortcut ? `(${intenalShortcut})` : ""}`
    );
  }, [tooltip, intenalShortcut]);

  return (
    <Tooltip2
      disabled={!tooltip}
      content={tooltipContent}
      compact
      hoverOpenDelay={750}
      placement={tooltipPlacement}
    >
      <div
        className={classNames(
          {
            "group-hover:opacity-100 hover:dark:bg-neutral-700 hover:bg-stone-200 cursor-pointer":
              !!onClick,
          },
          { [className as string]: !!className },
          { "opacity-50": disabled },
          "p-1 rounded",
          "select-none !outline-none"
        )}
        onClick={disabled ? undefined : onClick}
        onMouseOver={() =>
          overrideIconOnMouseEnter && setIconName(overrideIconOnMouseEnter)
        }
        onMouseOut={() => overrideIconOnMouseEnter && setIconName(icon)}
      >
        <Icon size={size} icon={iconName} />
      </div>
    </Tooltip2>
  );
}
