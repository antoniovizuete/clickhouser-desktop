import { useCallback, useState } from "react";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useRunQueryEvent } from "../../hooks/useRunQueryEvent";
import { performQuery } from "../../lib/clickhouse-clients";

export const useConsole = () => {
  const [showParams, setShowParams] = useState(false);
  const {
    sqlEditorRef,
    jsonEditorRef,
    setLoading,
    setQueryResult,
    getActiveTab,
  } = useTabsContext();

  const { getActiveConnection } = useConnectionContext();
  const { useRunQueryEventListen, emitRunQueryEvent } = useRunQueryEvent();

  useRunQueryEventListen(
    async (event) => {
      if (getActiveTab()?.loading) return;
      setLoading(true);

      const connection = await getActiveConnection();
      const { query, params } = event.payload;

      const queryResult = await performQuery({
        query,
        params,
        connection,
      });

      setQueryResult({ queryResult, sql: query, params });
    },
    [getActiveConnection, setQueryResult, setLoading]
  );

  const handleOnClickRunQuery = useCallback(async () => {
    emitRunQueryEvent({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
    });
  }, [sqlEditorRef.current, jsonEditorRef.current]);

  return {
    handleOnClickRunQuery,
    showParams,
    toggleShowParams: () => setShowParams((prev) => !prev),
  };
};
