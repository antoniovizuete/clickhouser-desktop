import { Icon, IconName } from "@blueprintjs/core";
import classNames from "classnames";

type Props = {
  className?: string;
  icon: IconName;
  onClick: () => void;
}
export default function ClickableIcon({ className, icon, onClick }: Props) {
  return (
    <div
      className={classNames(
        className ? { [className]: true } : {},
        "group-hover:opacity-100 hover:dark:bg-neutral-700 hover:bg-stone-200 cursor-pointer",
        "p-1 rounded",
        "select-none"
      )}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </div>
  )
}
