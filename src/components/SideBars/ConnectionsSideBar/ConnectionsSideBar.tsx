import { useEffect, useState } from "react";
import { connectionRepo } from "../../../lib/backend-repos";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import ClickableIcon from "../../core/ClickableIcon";
import SideBar from "../SideBar";
import SideBarEmptyState from "../SideBarEmptyState";
import { useConnectionDialogHandler } from "./components/ConnectionDialog";
import ConnectionItem from "./components/ConnectionItem";
import RemoveConnectionAlert from "./components/RemoveConnectionAlert";

export default function ConnectionsSideBar() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);

  const retrieveConnections = async () => {
    const retrievedConnections = await connectionRepo.get();
    setConnections(retrievedConnections);
  };

  const [ConnectionDialog, openConnetionDialog] = useConnectionDialogHandler({
    onClose: retrieveConnections,
  });

  useEffect(() => {
    retrieveConnections();
  }, []);

  const handleEditClick = (connection: Connection) => {
    openConnetionDialog(connection);
  };

  const handleNewClick = () => {
    openConnetionDialog();
  };

  const handleRemoveClick = (connection: Connection) => {
    setSelectedConnetionToDelete(connection);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setSelectedConnetionToDelete(undefined);
  };

  const handleConfirmRemove = () => {
    if (selectedConnetionToDelete) {
      connectionRepo.delete(selectedConnetionToDelete.id);
      AppToaster.top.warn(
        `The connection ${getConnectionDisplay({
          connection: selectedConnetionToDelete,
        })} was removed`
      );
      handleAlertClose();
      retrieveConnections();
    }
  };

  return (
    <>
      <SideBar
        icon="data-connection"
        title="Connections"
        buttons={
          <ClickableIcon
            className="text-black dark:text-white"
            onClick={handleNewClick}
            icon="plus"
          />
        }
      >
        {(connections || []).map((connection) => (
          <ConnectionItem
            key={connection.id}
            connection={connection}
            onEditClick={handleEditClick}
            onRemoveClick={handleRemoveClick}
          />
        ))}
        {connections.length === 0 && (
          <SideBarEmptyState text="You don't have any connections yet." />
        )}
      </SideBar>
      {ConnectionDialog}
      <RemoveConnectionAlert
        handleAlertClose={handleAlertClose}
        handleConfirmRemove={handleConfirmRemove}
        isAlertOpen={isAlertOpen}
        selectedConnetionToDelete={selectedConnetionToDelete}
      />
    </>
  );
}
