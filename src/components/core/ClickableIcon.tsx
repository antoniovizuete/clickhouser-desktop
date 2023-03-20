import { Icon, IconName } from "@blueprintjs/core";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  className?: string;
  icon: IconName;
  overrideIconOnMouseEnter?: IconName;
  onClick?: () => void;
}
export default function ClickableIcon({ className, icon, onClick, overrideIconOnMouseEnter }: Props) {
  const [iconName, setIconName] = useState(icon);

  return (
    <div
      className={classNames(
        className ? { [className]: true } : {},
        { "group-hover:opacity-100 hover:dark:bg-neutral-700 hover:bg-stone-200 cursor-pointer": !!onClick },
        "p-1 rounded",
        "select-none"
      )}
      onClick={onClick}
      onMouseOver={() => overrideIconOnMouseEnter && setIconName(overrideIconOnMouseEnter)}
      onMouseOut={() => overrideIconOnMouseEnter && setIconName(icon)}
    >
      <Icon icon={iconName} />
    </div>
  )
}
