import {
  Alert,
  Button,
  Classes,
  Drawer,
  DrawerSize,
  H4
} from "@blueprintjs/core";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { Connection } from "../../../lib/clickhouse-clients";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import { getConnections } from "../../../lib/connections-helpers/connection-repo";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import { useConnectionDialog } from "../hooks/useConnectionDialog";
import ConnectionItem from "./ConnectionItem";

export type ConnectionsDrawerRef = {
  open: () => void;
};

const ConnectionsDrawer = forwardRef<ConnectionsDrawerRef, {}>((_, ref) => {
  const { bpTheme } = useThemeContext();
  const { remove, databaseDecrypted } = useConnectionContext();

  useImperativeHandle(ref, () => ({ open }), []);

  const [ConnectionDialog, openConnetionDialog] = useConnectionDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);


  useEffect(() => {
    (async () => {
      if (!databaseDecrypted) {
        return;
      }

      try {
        const connections = await getConnections();
        setConnections(connections);
      } catch (error) {
        AppToaster.top.error("There was an error loading the connections");
      }
    })()
  }, [databaseDecrypted])


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
      remove(selectedConnetionToDelete);
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

  return (
    <>
      <Drawer
        className={bpTheme}
        isCloseButtonShown={false}
        icon="data-connection"
        isOpen={isOpen}
        onClose={close}
        position="left"
        size={DrawerSize.SMALL}
        title={
          <div className="flex flex-row justify-end items-center gap-1 mr-0.5">
            <H4>Connections</H4>
            <Button
              icon="plus"
              small
              intent="none"
              aria-label="New connection"
              onClick={handleNewClick}
            />
          </div>
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={`${Classes.DIALOG_BODY} flex flex-col gap-2`}>
            {(connections || []).map((connection, i) =>
              <ConnectionItem
                key={i}
                connection={connection}
                onEditClick={handleEditClick}
                onRemoveClick={handleRemoveClick}
              />
            )}
            {connections.length === 0 && (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <p>You don't have any connections yet.</p>
                <p>Click on the <Button icon="plus" small intent="none" disabled style={{ cursor: "default" }} /> button to add a new connection.</p>
              </div>
            )}
          </div>
        </div>
      </Drawer>
      {ConnectionDialog}
      <Alert
        className={bpTheme}
        cancelButtonText="Cancel"
        confirmButtonText="Remove"
        icon="trash"
        intent="danger"
        isOpen={isAlertOpen}
        onCancel={handleAlertClose}
        onConfirm={handleConfirmRemove}
      >
        <p>
          You are going to delete "
          {getConnectionDisplay({ connection: selectedConnetionToDelete })}"
          connection.
        </p>
        <p>Are you sure you want to remove this connection?</p>
      </Alert>
    </>
  );
});

export default ConnectionsDrawer;
