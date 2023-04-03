import { PropsWithChildren } from "react";
import Tag from "../../core/Tag";

type Props = {
  shortcut: string[];
};

export default function Shortcut({
  children,
  shortcut,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-full flex flex-row gap-3 items-center">
      <div className="w-1/2 text-right text-stone-500">{children}</div>
      <div className="w-1/2 flex gap-1">
        {shortcut.map((key, index) => (
          <Tag key={index}>{key}</Tag>
        ))}
      </div>
    </div>
  );
}
