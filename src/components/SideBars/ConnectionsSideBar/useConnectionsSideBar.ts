import { useCallback, useState } from "react";
import { connectionRepo } from "../../../lib/backend-repos/connection-repo";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import { useConnectionDialogHandler } from "./components/ConnectionDialog";

export const useConnectionsSideBar = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveConnections = useCallback(async () => {
    setIsLoading(true);
    try {
      const connections = await connectionRepo.get();
      setConnections(connections);
    } catch (error) {
      AppToaster.top.error("There was an error loading the connections");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [ConnectionDialog, openConnetionDialog] = useConnectionDialogHandler({
    onClose: retrieveConnections,
  });

  const handleNewClick = () => {
    openConnetionDialog();
  };

  const handleEditClick = (connection: Connection) => {
    openConnetionDialog(connection);
  };

  const handleRemoveClick = (connection: Connection) => {
    setSelectedConnetionToDelete(connection);
    setIsAlertOpen(true);
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

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setSelectedConnetionToDelete(undefined);
  };

  return {
    close,
    ConnectionDialog: () => ConnectionDialog,
    connections,
    handleAlertClose,
    handleConfirmRemove,
    handleEditClick,
    handleNewClick,
    handleRemoveClick,
    isAlertOpen,
    isLoading,
    retrieveConnections,
    selectedConnetionToDelete,
  };
};
