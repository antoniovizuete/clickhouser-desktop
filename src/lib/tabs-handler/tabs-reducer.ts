import { Reducer } from "react";
import { Query } from "../backend-repos/query-repo";
import { PerformQueryResult } from "../clickhouse-clients/perform-query/types";
import { getNewTab } from "./helpers";
import { Tab, TabAction } from "./types";

type TabsState = {
  tabs: Tab[];
  activeTabId: string;
};

export type TouchableFields = Extract<keyof Tab, "sql" | "params">;

type TabsActions =
  | { type: TabAction.ADD_TAB }
  | { type: TabAction.DUPLICATE_TAB; payload: { id: string } }
  | { type: TabAction.RESTORE_TAB; payload: { query: Query } }
  | { type: TabAction.CLOSE_TAB; payload: { id: string } }
  | { type: TabAction.CLOSE_OTHER_TABS; payload: { id: string } }
  | { type: TabAction.CLOSE_TABS_TO_THE_RIGHT; payload: { id: string } }
  | { type: TabAction.CLOSE_ALL_TABS }
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
  | {
      type: TabAction.MARK_AS_CHANGED;
      payload: { field: TouchableFields; value?: string };
    }
  | { type: TabAction.MARK_AS_SAVED }
  | { type: TabAction.BECOME_TO_NEW; payload: { id: string } }
  | {
      type: TabAction.SORT_TABS;
      payload: { sourceIndex: number; destinationIndex: number };
    };

const getInitialState = (): TabsState => {
  const tab = getNewTab();
  tab.closeable = false;
  return {
    tabs: [],
    activeTabId: "",
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
    case TabAction.DUPLICATE_TAB:
      const tabToDuplicate = state.tabs.find(
        (tab) => tab.id === action.payload.id
      );
      if (!tabToDuplicate) {
        return state;
      }
      const duplicatedTab = getNewTab();
      duplicatedTab.name = tabToDuplicate.name + " (copy)";
      duplicatedTab.sql = tabToDuplicate.sql;
      duplicatedTab.params = tabToDuplicate.params;
      return {
        ...state,
        tabs: [
          ...state.tabs.map((tab) => ({ ...tab, closeable: true })),
          duplicatedTab,
        ],
        activeTabId: duplicatedTab.id,
      };
    case TabAction.CLOSE_TAB:
      const tabs = state.tabs.filter((tab) => tab.id !== action.payload.id);
      const activeTabId =
        state.activeTabId === action.payload.id && tabs.length > 0
          ? tabs[tabs.length - 1].id
          : state.activeTabId;
      return {
        ...state,
        tabs,
        activeTabId: tabs.length === 0 ? "" : activeTabId,
      };
    case TabAction.CLOSE_OTHER_TABS:
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id === action.payload.id),
        activeTabId: action.payload.id,
      };
    case TabAction.CLOSE_TABS_TO_THE_RIGHT:
      return {
        ...state,
        tabs: state.tabs.filter(
          (tab, index) =>
            tab.id === action.payload.id ||
            index < state.tabs.findIndex((t) => t.id === action.payload.id)
        ),
        activeTabId: action.payload.id,
      };
    case TabAction.CLOSE_ALL_TABS:
      return getInitialState();
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
          tab.id === state.activeTabId &&
          tab[action.payload.field] !== action.payload.value
            ? {
                ...tab,
                [action.payload.field]: action.payload.value,
                touched: true,
              }
            : tab
        ),
      };
    case TabAction.MARK_AS_SAVED:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTabId
            ? { ...tab, touched: false, isNew: false }
            : tab
        ),
      };
    case TabAction.RESTORE_TAB:
      const restoredTab: Tab = {
        ...action.payload.query,
        closeable: true,
        icon: "console",
        loading: false,
        touched: false,
        isNew: false,
      };
      const tabsRestoring = !state.tabs.some((tab) => tab.id === restoredTab.id)
        ? [
            ...state.tabs.map((tab) => ({ ...tab, closeable: true })),
            restoredTab,
          ]
        : [...state.tabs];
      return {
        ...state,
        tabs: tabsRestoring,
        activeTabId: restoredTab.id,
      };

    case TabAction.BECOME_TO_NEW:
      const newId = crypto.randomUUID();
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? {
                ...tab,
                id: newId,
                isNew: true,
                touched: true,
              }
            : tab
        ),
        activeTabId:
          action.payload.id === state.activeTabId ? newId : state.activeTabId,
      };
    case TabAction.SORT_TABS:
      const tabsToSort = [...state.tabs];
      const [removed] = tabsToSort.splice(action.payload.sourceIndex, 1);
      tabsToSort.splice(action.payload.destinationIndex, 0, removed);
      return {
        ...state,
        tabs: tabsToSort,
      };
  }
};
