import { Connection } from "../clickhouse-clients";

export const getConnections = async (): Promise<Connection[]> => {
  return []; //invoke("get_all_connections");
};
