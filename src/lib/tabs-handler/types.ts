import { IconName } from "@blueprintjs/core";
import { PerformQueryResult } from "../clickhouse-clients/perform-query/types";

export enum TabAction {
  ADD_TAB = "ADD_TAB",
  REMOVE_TAB = "REMOVE_TAB",
  RENAME_TAB = "RENAME_TAB",
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  SET_LOADING = "SET_LOADING",
  SET_QUERY_RESULT = "SET_QUERY_RESULT",
  CHANGED_TAB = "CHANGED_TAB",
}

export type Tab = {
  id: string;
  closeable: boolean;
  icon: IconName;
  name: string;
  sql: string;
  params: string;
  queryResult?: PerformQueryResult;
  loading: boolean;
};
