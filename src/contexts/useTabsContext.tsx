import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import { EditorRef } from "../components/EditorsPane/components/Editor";
import { useCloseTabEvent } from "../events/close-tab/useCloseTabEvent";
import { useNewQueryEvent } from "../events/new-query/useNewQueryEvent";
import { usePreventCloseTabEvent } from "../events/prevent-close-tab/useClosingEvent";
import { Query } from "../lib/backend-repos/query-repo";
import { PerformQueryResult } from "../lib/clickhouse-clients/perform-query/types";
import {
  initialTabsState,
  Tab,
  TabAction,
  tabsReducer,
} from "../lib/tabs-handler";
import { TouchableFields } from "../lib/tabs-handler/tabs-reducer";

type TabsContextType = {
  getActiveTab: () => Tab | undefined;
  tabs: Tab[];
  activeTabId: string;
  addTab: () => void;
  restoreTab: (query: Query) => void;
  removeTab: (id: string) => void;
  renameTab: (name: string) => void;
  setActiveTabId: (id: string) => void;
  sqlEditorRef: RefObject<EditorRef>;
  jsonEditorRef: RefObject<EditorRef>;
  setLoading: (loading: boolean) => void;
  setQueryResult: (params: {
    queryResult: PerformQueryResult;
    sql?: string;
    params?: string;
  }) => void;
  markAsChanged: (field: TouchableFields, value?: string) => void;
  markAsSaved: () => void;
};

const TabsContext = createContext<TabsContextType>({
  getActiveTab: () => undefined,
  activeTabId: "",
  tabs: [],
  addTab: () => {},
  restoreTab: () => {},
  removeTab: () => {},
  renameTab: () => {},
  setActiveTabId: () => {},
  sqlEditorRef: { current: null },
  jsonEditorRef: { current: null },
  setLoading: () => {},
  setQueryResult: () => {},
  markAsChanged: () => {},
  markAsSaved: () => {},
});

export function TabsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(tabsReducer, initialTabsState);

  const { emitPreventCloseTabEvent } = usePreventCloseTabEvent();

  useCloseTabEvent().useCloseTabEventListener(
    (event) => {
      if (state.tabs.length > 1) {
        const tabToClose =
          event.payload?.tab ??
          state.tabs.find((t) => t.id === state.activeTabId);

        if (tabToClose?.touched && !event.payload?.force) {
          emitPreventCloseTabEvent({ tabToClose });
          return;
        }

        removeTab(tabToClose?.id ?? state.activeTabId);
      }
    },
    [state.activeTabId, state.tabs]
  );

  useNewQueryEvent().useNewQueryEventListener(() => {
    addTab();
  }, []);

  const { tabs, activeTabId } = state;
  const sqlEditorRef = useRef<EditorRef>(null);
  const jsonEditorRef = useRef<EditorRef>(null);

  const addTab = () => dispatch({ type: TabAction.ADD_TAB });

  const restoreTab = (query: Query) =>
    dispatch({ type: TabAction.RESTORE_TAB, payload: { query } });

  const getActiveTab = useCallback(() => {
    return tabs.find((t) => t.id === activeTabId);
  }, [activeTabId, tabs]);

  const removeTab = (id: string) =>
    dispatch({ type: TabAction.REMOVE_TAB, payload: { id } });

  const renameTab = (name: string) =>
    dispatch({ type: TabAction.RENAME_TAB, payload: { name } });

  const setLoading = (loading: boolean) =>
    dispatch({ type: TabAction.SET_LOADING, payload: { loading } });

  const setActiveTabId = (id: string) =>
    dispatch({ type: TabAction.SET_ACTIVE_TAB, payload: { id } });

  const setQueryResult = (params: {
    queryResult: PerformQueryResult;
    sql?: string;
    params?: string;
  }) =>
    dispatch({
      type: TabAction.SET_QUERY_RESULT,
      payload: params,
    });

  const markAsChanged: TabsContextType["markAsChanged"] = (field, value) =>
    dispatch({ type: TabAction.MARK_AS_CHANGED, payload: { field, value } });

  const markAsSaved = () => dispatch({ type: TabAction.MARK_AS_SAVED });

  const contextValue: TabsContextType = {
    activeTabId,
    addTab,
    getActiveTab,
    jsonEditorRef,
    restoreTab,
    removeTab,
    renameTab,
    setActiveTabId,
    setLoading,
    setQueryResult,
    sqlEditorRef,
    tabs,
    markAsChanged,
    markAsSaved,
  };

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
