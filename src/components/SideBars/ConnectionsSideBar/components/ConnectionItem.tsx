import { Icon, Spinner, SpinnerSize } from "@blueprintjs/core";
import { useState } from "react";
import { useConnectionContext } from "../../../../contexts/useConnectionContext";
import { Connection } from "../../../../lib/clickhouse-clients";
import { getInverseBW } from "../../../../lib/colors-helpers";
import { getConnectionDisplay, testConnection } from "../../../../lib/connections-helpers";
import { AppToaster } from "../../../../lib/toaster/AppToaster";
import SideBarItem from "../../SideBarItem";
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
  const isActive = connection.id === activeConnectionId?.id;

  const handleOnClick = async () => {
    try {
      setIsConnecting(true);
      await testConnection(connection);
      setActiveConnection(connection);
    } catch (error) {
      AppToaster.top.error(`Could not connect to ${getConnectionDisplay({ connection, showName: false })}.`)
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOnDoubleClick = () => {
    onEditClick(connection);
  }

  return (
    <ConnectionItemContextMenu connection={connection} onConnectClick={handleOnClick} onEditClick={onEditClick} onRemoveClick={onRemoveClick}>
      <SideBarItem
        caption={getConnectionDisplay({ connection })}
        right={isConnecting ? <Spinner size={SpinnerSize.SMALL} /> : isActive && <Icon icon="link" />}
        onClick={handleOnClick}
        onDoubleClick={handleOnDoubleClick}
        style={isActive ? {
          backgroundColor: connection.color,
          color: getInverseBW(connection.color)
        } : {}}
        tooltip={getConnectionDisplay({ connection })}
      />
    </ConnectionItemContextMenu>
  )
}
