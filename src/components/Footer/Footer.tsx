import { useTabsContext } from "../../contexts/useTabsContext";
import ConnectedTo from "./components/ConnectedTo";
import LeftFooter from "./components/LeftFooter";

export default function Footer() {
  const { getActiveTab } = useTabsContext();
  const activeTab = getActiveTab() ?? { id: "", queryResult: undefined };
  const result = activeTab.queryResult?.result;

  return (
    <div className="h-full flex flex-row justify-between items-center pr-5 bg-slate-50 dark:bg-neutral-800 dark:text-gray-400">
      <ConnectedTo />
      <LeftFooter result={result} />
    </div>
  );
}
