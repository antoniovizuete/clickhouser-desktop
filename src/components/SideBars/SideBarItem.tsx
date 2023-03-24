import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  caption: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  tooltip?: string;
  left?: ReactNode;
  right?: ReactNode;
  style?: React.CSSProperties;
};

export default function SideBarItem({
  left,
  right,
  onClick,
  onDoubleClick,
  caption,
  style,
  tooltip,
}: Props) {
  return (
    <Tooltip2
      compact
      disabled={!tooltip}
      content={tooltip}
      hoverOpenDelay={750}
      className="w-full"
    >
      <div
        className={classNames(
          "select-none w-full h-7 group flex justify-between items-center !outline-none group pr-3",
          "text-stone-600 dark:text-stone-400 ",
          "hover:text-stone-800 hover:dark:text-stone-200 gap-2 hover:cursor-pointer",
          "hover:bg-stone-100 dark:hover:bg-stone-800"
        )}
        style={style}
      >
        <div
          className="flex-grow flex justify-start items-center truncate pl-4"
          onClick={onClick}
          onDoubleClick={onDoubleClick}
        >
          {left}
          <div className="truncate">{caption}</div>
        </div>
        {right}
      </div>
    </Tooltip2>
  );
}
