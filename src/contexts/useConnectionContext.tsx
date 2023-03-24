import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { connectionRepo } from "../lib/backend-repos";
import {
  ActiveConnection,
  Connection,
  ConnectionDisplay,
  ConnectionId,
} from "../lib/clickhouse-clients";

type ConnectionsContextType = {
  activeConnectionId: ConnectionId | undefined;
  activeConnectionDisplay: ConnectionDisplay | undefined;
  setActiveConnectionDisplay: (
    connectionDisplay: ConnectionDisplay | undefined
  ) => void;
  setActiveConnection: (connection: ActiveConnection | undefined) => void;
  getActiveConnection: () => Promise<Connection | undefined>;
};

const ConnectionsContext = createContext<ConnectionsContextType>({
  activeConnectionDisplay: undefined,
  setActiveConnectionDisplay: () => {},
  activeConnectionId: undefined,
  setActiveConnection: () => {},
  getActiveConnection: () => Promise.reject(),
});

export function ConnectionsProvider({ children }: PropsWithChildren<{}>) {
  const [activeConnectionDisplay, setActiveConnectionDisplay] = useState<
    ConnectionDisplay | undefined
  >(undefined);
  const [activeConnectionId, setInternalActiveConnectionId] = useState<
    ConnectionId | undefined
  >(undefined);

  const setActiveConnection = async (
    activeConnection: ActiveConnection | undefined
  ) => {
    if (!activeConnection) {
      setInternalActiveConnectionId(undefined);
      setActiveConnectionDisplay(undefined);
      return;
    }
    const { id, ...display } = activeConnection;
    setInternalActiveConnectionId({ id });
    setActiveConnectionDisplay({ ...display });
  };

  const getActiveConnection = useCallback(async () => {
    return activeConnectionId
      ? await connectionRepo.getById(activeConnectionId.id)
      : undefined;
  }, [activeConnectionId]);

  const contextValue = {
    activeConnectionDisplay,
    setActiveConnectionDisplay,
    activeConnectionId,
    setActiveConnection,
    getActiveConnection,
  };

  return (
    <ConnectionsContext.Provider value={contextValue}>
      {children}
    </ConnectionsContext.Provider>
  );
}

export function useConnectionContext() {
  const context = useContext(ConnectionsContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
