import { useCallback, useEffect, useRef, useState } from "react";
import { EditorRef, OnExecuteQueryParams } from "../components/EditorsPane";
import { useEnterPassphraseDialog } from "../components/FirstTime/EnterPassphraseDialog";
import { useFirstTimeDialog } from "../components/FirstTime/FirstTimeDialog";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { performQuery, QueryResult } from "../lib/clickhouse-clients";

export const useApp = (isFirstTime: boolean) => {
  const sqlEditorRef = useRef<EditorRef>(null);
  const jsonEditorRef = useRef<EditorRef>(null);
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { getActiveConnection, activeConnectionId } = useConnectionContext();
  const [FirstTimeDialog, openFirstTimeDialog] = useFirstTimeDialog();
  const [EnterPassphraseDialog, openEnterPassphraseDialog] =
    useEnterPassphraseDialog({ openFirstTimeDialog });

  const executeQuery = useCallback(
    async ({ query, params }: OnExecuteQueryParams) => {
      setLoading(true);
      const connection = await getActiveConnection();

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
    [activeConnectionId]
  );

  const handelOnExecuteQuery = useCallback(
    (param: OnExecuteQueryParams) => {
      executeQuery(param);
    },
    [executeQuery, activeConnectionId]
  );

  const handleOnClickRunQuery = useCallback(async () => {
    executeQuery({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
      connection: await getActiveConnection(),
    });
  }, [
    sqlEditorRef.current,
    jsonEditorRef.current,
    executeQuery,
    activeConnectionId,
  ]);

  useEffect(() => {
    if (isFirstTime) {
      openFirstTimeDialog();
    } else {
      openEnterPassphraseDialog();
    }
  }, []);

  return {
    EnterPassphraseDialog,
    error,
    FirstTimeDialog,
    handleOnClickRunQuery,
    handelOnExecuteQuery,
    jsonEditorRef,
    loading,
    result,
    sqlEditorRef,
  };
};
