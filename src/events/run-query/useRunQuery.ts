import { useCallback } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useRunQueryEvent } from "./useRunQueryEvent";

export const useRunQuery = () => {
  const { sqlEditorRef, jsonEditorRef } = useTabsContext();

  const { emitRunQueryEvent } = useRunQueryEvent();

  const runQuery = useCallback(async () => {
    emitRunQueryEvent({
      query: sqlEditorRef.current?.getValue(),
      params: jsonEditorRef.current?.getValue(),
    });
  }, [sqlEditorRef.current, jsonEditorRef.current]);

  return {
    runQuery,
  };
};
