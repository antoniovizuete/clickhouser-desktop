import { Icon, IconSize, Tag } from "@blueprintjs/core";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay, testConnection } from "../../../lib/connections-helpers";
import { AppToaster } from "../../../lib/toaster/AppToaster";

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

  const handleOnClick = async () => {
    try {
      await testConnection(connection);
      setActiveConnection(connection);
    } catch (error) {
      AppToaster.top.error(`Could not connect to ${getConnectionDisplay({ connection, showName: false })}.`)
    }
  };

  const handleOnDoubleClick = () => {
    onEditClick(connection);
  }

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
        onClick={handleOnClick}
        onDoubleClick={handleOnDoubleClick}
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
