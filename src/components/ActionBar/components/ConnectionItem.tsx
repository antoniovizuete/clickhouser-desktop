import { Icon, Spinner, SpinnerSize, Tag } from "@blueprintjs/core";
import { useState } from "react";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay, testConnection } from "../../../lib/connections-helpers";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import ConnectionItemContextMenu from "./ConnectionItemContextMenu";

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
  const [isConnecting, setIsConnecting] = useState(false);
  const { setActiveConnection, activeConnectionId } = useConnectionContext();
  const active = connection.id === activeConnectionId?.id;

  const handleOnClick = async (conn: Connection) => {
    try {
      setIsConnecting(true);
      await testConnection(conn);
      setActiveConnection(conn);
    } catch (error) {
      AppToaster.top.error(`Could not connect to ${getConnectionDisplay({ connection: conn, showName: false })}.`)
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOnDoubleClick = () => {
    onEditClick(connection);
  }

  return (
    <div
      className="flex flex-row gap-0.5 justify-between items-center"
      key={connection.id}
    >
      <ConnectionItemContextMenu connection={connection} onConnectClick={handleOnClick} onEditClick={onEditClick} onRemoveClick={onRemoveClick}>
        <Tag
          intent={active ? "success" : "none"}
          interactive
          large
          minimal
          fill
          onClick={() => handleOnClick(connection)}
          onDoubleClick={handleOnDoubleClick}
        >
          <div
            className={`flex-grow flex flex-row justify-between items-center ${active ? "font-bold" : ""
              }`}
          >
            <div className="flex-grow select-none">
              {getConnectionDisplay({ connection })}
            </div>
            {isConnecting && (
              <Spinner size={SpinnerSize.SMALL} />
            )}
            {!isConnecting && connection.id === activeConnectionId?.id && (
              <Icon icon="link" className="ml-" />
            )}
          </div>
        </Tag>
      </ConnectionItemContextMenu>
    </div>
  )
}
