import { useCallback, useRef, useState } from "react";
import { EditorRef } from "../components/Editor";
import { OnExecuteQueryParams } from "../components/EditorsPane";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { performQuery, QueryResult } from "../lib/clickhouse-clients";

export const useApp = () => {
  const sqlEditorRef = useRef<EditorRef>(null);
  const jsonEditorRef = useRef<EditorRef>(null);
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { getActiveConnection } = useConnectionContext();

  const executeQuery = useCallback(
    async ({ query, params }: OnExecuteQueryParams) => {
      setLoading(true);
      const connection = getActiveConnection();

      if (!connection) {
        setError("No active connection");
        return;
      }

      const { error, result } = await performQuery({
        ...connection,
        query,
        jsonParams: params,
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

  return {
    error,
    executeQuery,
    jsonEditorRef,
    loading,
    result,
    sqlEditorRef,
  };
};
