import {
  createContext,
  PropsWithChildren, RefObject, useCallback,
  useContext, useReducer,
  useRef
} from "react";
import { EditorRef } from "../components/EditorsPane/components/Editor";
import { PerformQueryResult } from "../lib/clickhouse-clients/perform-query/types";
import { initialTabsState, Tab, TabAction, tabsReducer } from "../lib/tabs-handler";

type TabsContextType = {
  getActiveTab: () => Tab | undefined;
  tabs: Tab[];
  activeTabId: string;
  addTab: () => void;
  removeTab: (id: string) => void;
  renameTab: (name: string) => void;
  setActiveTabId: (id: string) => void;
  sqlEditorRef: RefObject<EditorRef>;
  jsonEditorRef: RefObject<EditorRef>;
  setLoading: (loading: boolean) => void;
  setQueryResult: (params: { queryResult: PerformQueryResult, query?: string, params?: string }) => void;
};

const TabsContext = createContext<TabsContextType>({
  getActiveTab: () => undefined,
  activeTabId: "",
  tabs: [],
  addTab: () => { },
  removeTab: () => { },
  renameTab: () => { },
  setActiveTabId: () => { },
  sqlEditorRef: { current: null },
  jsonEditorRef: { current: null },
  setLoading: () => { },
  setQueryResult: () => { },
});


export function TabsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(tabsReducer, initialTabsState)
  const { tabs, activeTabId, changingTab } = state;
  const sqlEditorRef = useRef<EditorRef>(null);
  const jsonEditorRef = useRef<EditorRef>(null);

  const addTab = () => dispatch({ type: TabAction.ADD_TAB });

  const getActiveTab = useCallback(() => {
    return tabs.find((t) => t.id === activeTabId);
  }, [activeTabId, tabs])

  const removeTab = (id: string) => dispatch({ type: TabAction.REMOVE_TAB, payload: { id } });

  const renameTab = (name: string) => dispatch({ type: TabAction.RENAME_TAB, payload: { name } });

  const setLoading = (loading: boolean) => dispatch({ type: TabAction.SET_LOADING, payload: { loading } });

  const setActiveTabId = (id: string) => dispatch({ type: TabAction.SET_ACTIVE_TAB, payload: { id } });

  const setQueryResult = (params: { queryResult: PerformQueryResult, sql?: string, params?: string }) => dispatch({
    type: TabAction.SET_QUERY_RESULT,
    payload: params
  });

  const contextValue: TabsContextType = {
    activeTabId,
    addTab,
    getActiveTab,
    jsonEditorRef,
    removeTab,
    renameTab,
    setActiveTabId,
    setLoading,
    setQueryResult,
    sqlEditorRef,
    tabs,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
