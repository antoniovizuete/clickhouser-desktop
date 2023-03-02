import { Icon, IconSize, Tag } from "@blueprintjs/core";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";

type ConnectionItemProps = {
  connection: Connection;
  onEditClick: (connection: Connection) => void;
  onRemoveClick: (connection: Connection) => void;
}
export default function ConnectionItem({
  connection,
  onEditClick,
  onRemoveClick,
}: ConnectionItemProps) {
  const { setActiveConnection, activeConnectionId } = useConnectionContext();
  const active = connection.id === activeConnectionId?.id;

  return (
    <div
      className="flex flex-row gap-1 justify-between items-center"
      key={connection.id}
    >
      <Tag
        intent={active ? "success" : "none"}
        interactive
        large
        minimal
        fill
        round
        onClick={() => setActiveConnection(connection)}
        onDoubleClick={() => onEditClick(connection)}
      >
        <div
          className={`flex-grow flex flex-row justify-between items-center ${active ? "font-bold" : ""
            }`}
        >
          <div className="flex-grow select-none">
            {getConnectionDisplay({ connection })}
          </div>
          {connection.id === activeConnectionId?.id && (
            <Icon icon="link" className="ml-" />
          )}
        </div>
      </Tag>
      <div className="flex flex-row gap-1 justify-end">
        <Icon
          icon="edit"
          intent="primary"
          size={IconSize.STANDARD}
          onClick={() => onEditClick(connection)}
          className="cursor-pointer"
        ></Icon>

        <Icon
          intent="danger"
          icon="cross"
          size={IconSize.STANDARD}
          className="cursor-pointer"
          onClick={() => onRemoveClick(connection)}
        ></Icon>
      </div>
    </div>
  )
}
