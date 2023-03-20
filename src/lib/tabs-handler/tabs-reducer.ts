import { Reducer } from "react";
import { PerformQueryResult } from "../clickhouse-clients/perform-query/types";
import { getNewTab } from "./helpers";
import { Tab, TabAction } from "./types";

type TabsState = {
  tabs: Tab[];
  activeTabId: string;
  changingTab: boolean;
};

type TabsActions =
  | { type: TabAction.ADD_TAB }
  | { type: TabAction.REMOVE_TAB; payload: { id: string } }
  | { type: TabAction.RENAME_TAB; payload: { name: string } }
  | {
      type: TabAction.SET_ACTIVE_TAB;
      payload: {
        id: string;
        sql?: string;
        params?: string;
      };
    }
  | { type: TabAction.SET_LOADING; payload: { loading: boolean } }
  | {
      type: TabAction.SET_QUERY_RESULT;
      payload: {
        queryResult: PerformQueryResult;
        sql?: string;
        params?: string;
      };
    }
  | { type: TabAction.MARK_AS_CHANGED };

const getInitialState = (): TabsState => {
  const tab = getNewTab();
  tab.closeable = false;
  return {
    tabs: [tab],
    activeTabId: tab.id,
    changingTab: false,
  };
};

export const initialTabsState: TabsState = getInitialState();

export const tabsReducer: Reducer<TabsState, TabsActions> = (
  state,
  action
): TabsState => {
  switch (action.type) {
    case TabAction.ADD_TAB:
      const newTab = getNewTab();
      return {
        ...state,
        tabs: [
          ...state.tabs.map((tab) => ({ ...tab, closeable: true })),
          newTab,
        ],
        activeTabId: newTab.id,
      };
    case TabAction.REMOVE_TAB:
      const tabs = state.tabs
        .filter((tab) => tab.id !== action.payload.id)
        .map((tab, _, arr) => ({
          ...tab,
          closeable: arr.length === 1 ? false : true,
        }));

      const activeTabId =
        state.activeTabId === action.payload.id
          ? tabs[tabs.length - 1].id
          : state.activeTabId;
      return {
        ...state,
        tabs,
        activeTabId,
      };
    case TabAction.RENAME_TAB:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId
            ? { ...tab, name: action.payload.name, touched: true }
            : tab
        ),
      };
    case TabAction.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTabId: action.payload.id,
        changingTab: true,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId
            ? {
                ...tab,
                sql: action.payload.sql ?? "",
                params: action.payload.params ?? "",
              }
            : tab
        ),
      };

    case TabAction.SET_LOADING:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId
            ? { ...tab, loading: action.payload.loading }
            : tab
        ),
      };
    case TabAction.SET_QUERY_RESULT:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId
            ? {
                ...tab,
                queryResult: action.payload.queryResult,
                sql: action.payload.sql ?? "",
                params: action.payload.params ?? "",
                loading: false,
              }
            : tab
        ),
      };
    case TabAction.MARK_AS_CHANGED:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId ? { ...tab, touched: true } : tab
        ),
      };
    default:
      return state;
  }
};
