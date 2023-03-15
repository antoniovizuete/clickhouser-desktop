import { Button, Icon, IconName } from "@blueprintjs/core";
import { PropsWithChildren } from "react";
import { useThemeContext } from "../../../contexts/useThemeContext";

type Props = {
  action?: () => void;
  grayed?: boolean;
  icon: IconName;
};

export default function ThemedButton({ action, icon, grayed, children }: PropsWithChildren<Props>) {
  const { bpTheme } = useThemeContext();

  return (
    <Button
      className={`dark:bg-[#383e47] dark:hover:bg-[#2f343c] dark:text-white ${grayed ? "text-gray-300 dark:text-gray-500" : ""}`}
      icon={
        <Icon
          icon={icon}
          color={grayed ? "#999" : bpTheme ? "white" : "#383e47"}
        />
      }
      onClick={() => action?.()}
    >
      {children}
    </Button>
  );
}
