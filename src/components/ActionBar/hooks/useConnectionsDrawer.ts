import {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { connectionRepo } from "../../../lib/backend-repos/connection-repo";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import { ConnectionsDrawerRef } from "../components/ConnectionsDrawer";
import { useConnectionDialogHandler } from "./useConnectionDialogHandler";

type Params = {
  ref: ForwardedRef<ConnectionsDrawerRef>;
};

export const useConnectionsDrawer = ({ ref }: Params) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({ open }), []);

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

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

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
    ConnectionDialog,
    connections,
    handleAlertClose,
    handleConfirmRemove,
    handleEditClick,
    handleNewClick,
    handleRemoveClick,
    isAlertOpen,
    isLoading,
    isOpen,
    retrieveConnections,
    selectedConnetionToDelete,
  };
};
