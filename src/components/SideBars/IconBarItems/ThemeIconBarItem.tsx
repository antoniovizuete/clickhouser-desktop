import { useThemeContext } from "../../../contexts/useThemeContext";
import IconBarItem from "../../core/IconBarItem";

export default function ThemeIconBarItem() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <IconBarItem
      icon={theme === "dark" ? "flash" : "moon"}
      onClick={toggleTheme}
      tooltip="Toggle theme"
    />
  );
}
