import { PropsWithChildren } from "react";

type Props = {
  intent?: "primary" | "success" | "warning" | "danger" | "none" | "info";
};

export default function Tag({
  children,
  intent = "none",
}: PropsWithChildren<Props>) {
  return (
    <div className="bg-stone-300 dark:bg-stone-900 dark:text-stone-300 px-2 py-0.5 rounded">
      {children}
    </div>
  );
}
