import { Tag } from "@blueprintjs/core";
import { PropsWithChildren } from "react";

type Props = {
  shortcut: string[];
};

export default function Shortcut({
  children,
  shortcut,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-full flex flex-row gap-1 items-center">
      <div className="">
        {shortcut.map((key, index) => (
          <Tag key={index} minimal>
            {key}
          </Tag>
        ))}
      </div>
      <div className="">{children}</div>
    </div>
  );
}
