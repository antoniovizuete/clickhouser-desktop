export type ConnectionId = {
  id: number;
};

export type ConnectionDisplay = {
  name: string;
  host: string;
  port: number;
  username: string;
  database: string;
};

export type ConnectionBody = ConnectionDisplay & {
  password: string;
  secure: boolean;
};

export type Connection = ConnectionId & ConnectionBody;

export type ActiveConnection = ConnectionId & ConnectionDisplay;

export type ClickhouseConnectionParams = {
  username: string;
  password?: string;
  serverAddress: string;
  database?: string;
};
