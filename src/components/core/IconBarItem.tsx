import { Icon, IconName } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { useShortcutOnTooltip } from "../../hooks/useShortcutOnTooltip";

type Props = {
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
  shortcut?: string;
  tooltip?: string;
};

export default function IconBarItem({
  icon,
  isActive,
  onClick,
  shortcut,
  tooltip,
}: Props) {
  const tooltipContent = useShortcutOnTooltip({ shortcut, tooltip });
  return (
    <Tooltip2
      className="w-full"
      content={tooltipContent}
      compact
      hoverOpenDelay={750}
      placement="right"
    >
      <div
        className={classNames(
          "!outline-none",
          "w-full h-12 flex flex-row justify-center items-center py-6 px-2 border-r-4 hover:cursor-pointer group",
          { "border-r-yellow-600 dark:border-r-primary": isActive },
          {
            "border-r-transparent hover:border-r-yellow-500 hover:dark:border-r-primary/40":
              !isActive,
          }
        )}
        onClick={onClick}
      >
        <Icon
          className={classNames(
            "!outline-none",
            {
              "text-yellow-600 dark:text-primary/80 hover:dark:text-primary/100":
                isActive,
            },
            {
              "hover:scale-110 text-neutral-500 group-hover:text-yellow-500 dark:text-stone-500 dark:group-hover:text-primary/40":
                !isActive,
            }
          )}
          icon={icon}
          size={24}
        />
      </div>
    </Tooltip2>
  );
}
