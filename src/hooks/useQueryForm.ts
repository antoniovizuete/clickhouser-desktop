import { useCallback } from "react";
import { QueryFormProps } from "../components/QueryForm";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { performQuery } from "../lib/clickhouse-clients";
import { useHotKeys } from "./useHotKeys";

export const useQueryForm = ({
  onSuccess,
  onError,
  onPerformQuery,
}: QueryFormProps) => {
  const { getActiveConnection } = useConnectionContext();

  const runQuery = useCallback(
    async (query: string, jsonParams: string) => {
      onPerformQuery?.();
      const connection = getActiveConnection();

      if (!connection) {
        onError?.("No active connection");
        return;
      }

      const { error, result } = await performQuery({
        ...connection,
        query,
        jsonParams,
      });
      if (error) {
        onError?.(error);
      }
      if (result) {
        onSuccess?.(result);
      }
    },
    [onError, onSuccess, onPerformQuery, performQuery, getActiveConnection]
  );

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () => runQuery(),
      deps: [runQuery, getActiveConnection],
    },
    {
      combo: "alt+h, option+h",
      description: "Show this help",
      help: true,
    },
  ]);

  return {
    HotKeysHelpDialog,
    openHelpDialog,
    runQuery,
  };
};
