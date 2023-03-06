import { ConnectionBody, performQuery } from "../clickhouse-clients";

export const testConnection = async (connection: ConnectionBody) => {
  const { error } = await performQuery({
    query: "SELECT 1",
    timeout: 10_000,
    ...connection,
  });

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve();
};
