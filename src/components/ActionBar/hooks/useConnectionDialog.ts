import { ForwardedRef, useEffect, useImperativeHandle, useState } from "react";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import {
  Connection,
  ConnectionBody,
  performQuery,
} from "../../../lib/clickhouse-clients";
import {
  insertConnection,
  updateConnection,
} from "../../../lib/connections-helpers/connection-repo";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import { ConnectionDialogRef } from "../components/ConnectionDialog";

type Params = {
  onClose: () => void;
  ref: ForwardedRef<ConnectionDialogRef>;
};

export const useConnectionDialog = ({ onClose, ref }: Params) => {
  const { activeConnectionId, setActiveConnectionDisplay } =
    useConnectionContext();
  const [isOpen, setIsOpen] = useState(false);

  const [connection, setConnection] = useState<Connection | undefined>(
    undefined
  );

  const [tested, setTested] = useState(false);

  const [name, setName] = useState(connection?.name || "");
  const [host, setHost] = useState(connection?.host || "localhost");
  const [port, setPort] = useState(connection?.port || 8123);
  const [username, setUsername] = useState(connection?.username || "default");
  const [password, setPassword] = useState(connection?.password || "");
  const [secure, setSecure] = useState(connection?.secure || false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTested(false);
  }, [host, port, username, password, secure]);

  useEffect(() => {
    if (connection) {
      setName(connection.name);
      setHost(connection.host);
      setPort(connection.port);
      setUsername(connection.username);
      setPassword(connection.password);
      setSecure(connection.secure);
    } else {
      setName("");
      setHost("localhost");
      setPort(8123);
      setUsername("default");
      setPassword("");
      setSecure(false);
    }
  }, [connection]);

  const close = () => {
    setIsOpen(false);
    setConnection(undefined);
    setTested(false);
    setName("");
    setHost("localhost");
    setPort(8123);
    setUsername("default");
    setPassword("");
    setSecure(false);
    onClose();
  };

  const open = (connection?: Connection) => {
    setIsOpen(true);
    setConnection(connection);
  };

  const test = async () => {
    const { error } = await performQuery({
      query: "SELECT 1",
      name,
      host,
      port,
      username,
      password,
      secure,
    });
    if (error) {
      AppToaster.top.error(error);
    } else {
      AppToaster.top.success("Successfully connected");
    }

    setTested(!error);
  };

  useImperativeHandle(ref, () => ({ open }), []);

  const save = async () => {
    const connectionToSave: ConnectionBody = {
      name,
      host,
      port,
      username,
      password,
      secure,
    };

    if (connection) {
      await updateConnection(connection.id, connectionToSave);
      if (connection.id === activeConnectionId?.id) {
        setActiveConnectionDisplay(connectionToSave);
      }
    } else {
      await insertConnection(connectionToSave);
    }

    AppToaster.top.success("The connection has been saved successfully");
    close();
  };

  return {
    connection,
    isOpen,
    name,
    setName,
    host,
    setHost,
    port,
    setPort,
    username,
    setUsername,
    password,
    setPassword,
    secure,
    setSecure,
    showPassword,
    setShowPassword,
    tested,
    test,
    save,
    close,
  };
};
