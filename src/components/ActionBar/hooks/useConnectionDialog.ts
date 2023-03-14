import { ForwardedRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { useConnectionContext } from "../../../contexts/useConnectionContext";
import { Connection, ConnectionBody } from "../../../lib/clickhouse-clients";
import { testConnection } from "../../../lib/connections-helpers";
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

  const { control, handleSubmit, getValues, watch } = useForm<ConnectionBody>({
    values: {
      name: connection?.name || "",
      host: connection?.host || "",
      port: connection?.port || 8123,
      secure: connection?.secure || false,
      database: connection?.database || "",
      username: connection?.username || "default",
      password: connection?.password || "",
    },
    defaultValues: {
      name: "",
      host: "",
      port: 8123,
      secure: false,
      database: "",
      username: "default",
      password: "",
    },
  });

  const onClickTest = async () => {
    try {
      const connection = getValues();
      await test(connection);
      AppToaster.top.success("Successfully connected");
    } catch (error) {
      AppToaster.top.error((error as Error).message);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await test(data);
    } catch (error) {
      AppToaster.top.error((error as Error).message);
      return;
    }

    try {
      await save(data);
      AppToaster.top.success("The connection has been saved successfully");
      close();
    } catch (error) {
      console.log(error);
      AppToaster.top.error("The connection could not be saved");
    }
  });

  const [tested, setTested] = useState(false);

  useEffect(() => {
    const subscription = watch(() => setTested(false));
    return () => subscription.unsubscribe();
  }, [watch]);

  const close = () => {
    setConnection(undefined);
    setTested(false);
    onClose();
    setIsOpen(false);
  };

  const open = (connection?: Connection) => {
    setIsOpen(true);
    setConnection(connection);
  };

  const test = async (connection: ConnectionBody) => {
    return testConnection(connection)
      .then(() => void setTested(true))
      .catch(() => {
        setTested(false);
        throw new Error("Could not connect to the server");
      });
  };

  useImperativeHandle(ref, () => ({ open }), []);

  const save = async (connectionToSave: ConnectionBody) => {
    if (connection) {
      await updateConnection(connection.id, connectionToSave);
      if (connection.id === activeConnectionId?.id) {
        setActiveConnectionDisplay(connectionToSave);
      }
    } else {
      await insertConnection(connectionToSave);
    }
    close();
  };

  return {
    close,
    connection,
    control,
    isOpen,
    onClickTest,
    onSubmit,
    tested,
  };
};
