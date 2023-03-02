import { invoke } from "@tauri-apps/api/tauri";
import { Connection, ConnectionBody } from "../clickhouse-clients";

export const getConnections = async (): Promise<Connection[]> => {
  return invoke("get_all_connections");
};

export const getConnectionById = async (
  id: Connection["id"]
): Promise<Connection> => {
  return invoke("get_connection_by_id", { id });
};

export const updateConnection = async (
  id: Connection["id"],
  connection: ConnectionBody
): Promise<void> => {
  return invoke("update_connection", {
    id,
    connection,
  });
};

export const insertConnection = async (
  connection: ConnectionBody
): Promise<void> => {
  return invoke("insert_connection", { connection });
};

export const deleteConnection = async (id: number): Promise<void> => {
  return invoke("delete_connection", { id });
};
