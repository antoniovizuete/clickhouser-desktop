import { invoke } from "@tauri-apps/api/tauri";
import { Connection } from "../clickhouse-clients";

export const getConnections = async (): Promise<Connection[]> => {
  return invoke("get_all_connections");
};
