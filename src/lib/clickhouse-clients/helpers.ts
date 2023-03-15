import { ClickhouseConnectionParams, ConnectionBody } from "./types";

export const transformConnectionToConnectionParams = (
  connection?: ConnectionBody
): ClickhouseConnectionParams | undefined => {
  if (!connection) {
    return undefined;
  }

  return {
    username: connection.username,
    password: connection.password,
    serverAddress: `http${connection.secure ? "s" : ""}://${connection.host}:${
      connection.port
    }`,
    database: connection.database,
  };
};

export const checkUrl = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};
