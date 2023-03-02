import {
  Alert,
  Button,
  Classes,
  Drawer,
  DrawerSize,
  H4,
  Spinner
} from "@blueprintjs/core";
import { forwardRef } from "react";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { getConnectionDisplay } from "../../../lib/connections-helpers";
import { useConnectionsDrawer } from "../hooks/useConnectionsDrawer";
import ConnectionItem from "./ConnectionItem";

export type ConnectionsDrawerRef = {
  open: () => void;
};

const ConnectionsDrawer = forwardRef<ConnectionsDrawerRef, {}>((_, ref) => {
  const { bpTheme } = useThemeContext();
  const {
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
  } = useConnectionsDrawer({ ref });

  return (
    <>
      <Drawer
        className={bpTheme}
        isCloseButtonShown={false}
        icon={isLoading ? <Spinner size={18} className="mr-[10px]" /> : "data-connection"}
        isOpen={isOpen}
        onClose={close}
        onOpened={retrieveConnections}
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

            {(connections || []).map((connection) =>
              <ConnectionItem
                key={connection.id}
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
