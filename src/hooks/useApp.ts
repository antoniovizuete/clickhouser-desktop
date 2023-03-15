import { useCallback, useRef, useState } from "react";
import { EditorRef } from "../components/EditorsPane";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { performQuery, QueryResult } from "../lib/clickhouse-clients";
import { useRunQueryEvent } from "./useRunQueryEvent";

export const useApp = () => {
  const sqlEditorRef = useRef<EditorRef>(null);
  const jsonEditorRef = useRef<EditorRef>(null);
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { getActiveConnection } = useConnectionContext();
  const { useRunQueryEventListen, emitRunQueryEvent } = useRunQueryEvent();
  useRunQueryEventListen(
    async (event) => {
      setLoading(true);
      const connection = await getActiveConnection();

      const { error, result } = await performQuery({
        query: event.payload.query,
        jsonParams: event.payload.params,
        connection,
      });

      if (error) {
        setError(error);
        setResult(undefined);
      }

      if (result) {
        setResult(result);
        setError(undefined);
      }

      setLoading(false);
    },
    [getActiveConnection]
  );

  const handleOnClickRunQuery = useCallback(async () => {
    emitRunQueryEvent({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
    });
  }, [sqlEditorRef.current, jsonEditorRef.current]);

  return {
    error,
    handleOnClickRunQuery,
    jsonEditorRef,
    loading,
    result,
    sqlEditorRef,
  };
};
