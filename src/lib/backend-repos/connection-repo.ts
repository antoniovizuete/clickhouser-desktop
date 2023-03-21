import { Connection } from "../clickhouse-clients";
import { BackendRepo } from "./BackendRepo";

class ConnectionRepo extends BackendRepo<Connection, Connection["id"]> {
  constructor() {
    super("connection");
  }
}

export const connectionRepo = new ConnectionRepo();
