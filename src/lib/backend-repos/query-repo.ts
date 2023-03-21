import { Tab } from "../tabs-handler";
import { BackendRepo } from "./BackendRepo";

export type Query = Pick<Tab, "id" | "name" | "sql" | "params">;

class QueryRepo extends BackendRepo<Query, Query["id"]> {
  constructor() {
    super("query");
  }
}

export const queryRepo = new QueryRepo();
