import {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import {
  deleteConnection,
  getConnections,
} from "../../../lib/connections-helpers/connection-repo";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import { ConnectionsDrawerRef } from "../components/ConnectionsDrawer";
import { useConnectionDialogHandler } from "./useConnectionDialogHandler";

type Params = {
  ref: ForwardedRef<ConnectionsDrawerRef>;
};

export const useConnectionsDrawer = ({ ref }: Params) => {
  const { databaseDecrypted } = useConnectionContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);

  useImperativeHandle(ref, () => ({ open }), []);

  const retrieveConnections = useCallback(async () => {
    if (!databaseDecrypted) {
      return;
    }

    try {
      const connections = await getConnections();
      setConnections(connections);
    } catch (error) {
      AppToaster.top.error("There was an error loading the connections");
    }
  }, [databaseDecrypted]);

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
      deleteConnection(selectedConnetionToDelete.id);
      AppToaster.top.warn(
        `The connection ${getConnectionDisplay({
          connection: selectedConnetionToDelete,
        })} was removed`
      );
      handleAlertClose();
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
    isOpen,
    retrieveConnections,
    selectedConnetionToDelete,
  };
};