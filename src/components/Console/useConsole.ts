import { useCallback, useState } from "react";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useRunQueryEvent } from "../../events/run-query/useRunQueryEvent";
import { useToggleParamsEvent } from "../../events/toggle-params/useToggleParamsEvent";
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

  const toggleShowParams = useCallback(() => {
    setShowParams((prev) => !prev);
  }, [setShowParams]);

  useToggleParamsEvent().useToggleParamsEventListener(() => {
    toggleShowParams();
  }, [toggleShowParams]);

  const { useRunQueryEventListener, emitRunQueryEvent } = useRunQueryEvent();

  useRunQueryEventListener(async () => {
    if (getActiveTab()?.loading) return;
    setLoading(true);

    const connection = await getActiveConnection();
    const query = sqlEditorRef.current?.getValue();
    const params = jsonEditorRef.current?.getValue();

    const queryResult = await performQuery({
      query,
      params,
      connection,
    });

    setQueryResult({ queryResult, sql: query, params });
  }, [
    getActiveConnection,
    setQueryResult,
    setLoading,
    sqlEditorRef.current,
    jsonEditorRef.current,
  ]);

  const handleOnClickRunQuery = useCallback(async () => {
    emitRunQueryEvent({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
    });
  }, [sqlEditorRef.current, jsonEditorRef.current]);

  return {
    handleOnClickRunQuery,
    showParams,
    toggleShowParams,
  };
};
