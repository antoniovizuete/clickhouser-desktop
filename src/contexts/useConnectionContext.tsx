import {
  createContext,
  PropsWithChildren,
  useContext, useState
} from "react";
import {
  ActiveConnection,
  Connection, ConnectionDisplay, ConnectionId
} from "../lib/clickhouse-clients";
import { getConnectionById } from "../lib/connections-helpers/connection-repo";

type ConnectionsContextType = {
  databaseDecrypted: boolean;
  setDatabaseDecrypted: (databaseDecrypted: boolean) => void;
  activeConnectionId: ConnectionId | undefined;
  activeConnectionDisplay: ConnectionDisplay | undefined;
  setActiveConnectionDisplay: (connectionDisplay: ConnectionDisplay | undefined) => void;
  setActiveConnection: (connection: ActiveConnection | undefined) => void;
  getActiveConnection: () => Promise<Connection | undefined>;
};

const ConnectionsContext = createContext<ConnectionsContextType>({
  databaseDecrypted: false,
  activeConnectionDisplay: undefined,
  setActiveConnectionDisplay: () => { },
  setDatabaseDecrypted: () => { },
  activeConnectionId: undefined,
  setActiveConnection: () => { },
  getActiveConnection: () => Promise.reject(),
});

export function ConnectionsProvider({ children }: PropsWithChildren<{}>) {
  const [databaseDecrypted, setDatabaseDecrypted] = useState(false);
  const [activeConnectionDisplay, setActiveConnectionDisplay] = useState<
    ConnectionDisplay | undefined
  >(undefined);
  const [activeConnectionId, setInternalActiveConnectionId] = useState<
    ConnectionId | undefined
  >(undefined);

  const setActiveConnection = async (activeConnection: ActiveConnection | undefined) => {
    if (!activeConnection) {
      setInternalActiveConnectionId(undefined);
      setActiveConnectionDisplay(undefined);
      return;
    }
    const { id, ...display } = activeConnection;
    setInternalActiveConnectionId({ id });
    setActiveConnectionDisplay({ ...display });
  };

  const contextValue = {
    databaseDecrypted,
    activeConnectionDisplay,
    setActiveConnectionDisplay,
    setDatabaseDecrypted,
    activeConnectionId,
    setActiveConnection,
    getActiveConnection: async () => activeConnectionId ? await getConnectionById(activeConnectionId.id) : undefined
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
