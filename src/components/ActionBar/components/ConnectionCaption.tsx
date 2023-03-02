import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { getConnectionDisplay } from "../../../lib/connections-helpers";

export default function ConnectionCaption() {
  const { activeConnectionDisplay } = useConnectionContext();

  if (!activeConnectionDisplay) {
    return <div className="ml-1 text-neutral-500">No selected connection</div>
  }

  return <div className="ml-1">
    {activeConnectionDisplay.name}{" "}
    <span className="text-neutral-400 text-xs">
      {activeConnectionDisplay.name ? "(" : ""}
      {getConnectionDisplay({
        connection: activeConnectionDisplay,
        showName: false,
        excerpt: !!activeConnectionDisplay.name,
      })}
      {activeConnectionDisplay.name ? ")" : ""}
    </span>
  </div>
    ;
}
