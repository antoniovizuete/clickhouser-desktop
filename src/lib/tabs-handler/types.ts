import { IconName } from "@blueprintjs/core";
import { PerformQueryResult } from "../clickhouse-clients/perform-query/types";

export enum TabAction {
  ADD_TAB = "ADD_TAB",
  DUPLICATE_TAB = "DUPLICATE_TAB",
  RESTORE_TAB = "RESTORE_TAB",
  CLOSE_TAB = "CLOSE_TAB",
  CLOSE_OTHER_TABS = "CLOSE_OTHER_TABS",
  CLOSE_TABS_TO_THE_RIGHT = "CLOSE_TO_THE_RIGHT",
  CLOSE_ALL_TABS = "CLOSE_ALL_TABS",
  RENAME_TAB = "RENAME_TAB",
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  SET_LOADING = "SET_LOADING",
  SET_QUERY_RESULT = "SET_QUERY_RESULT",
  MARK_AS_CHANGED = "MARK_AS_CHANGED",
  MARK_AS_SAVED = "MARK_AS_SAVED",
  BECOME_TO_NEW = "BECOME_TO_NEW",
  SORT_TABS = "SORT_TABS",
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
  touched: boolean;
  isNew: boolean;
};
