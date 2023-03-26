import { useCallback } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { queryRepo } from "../../lib/backend-repos/query-repo";
import { Tab } from "../../lib/tabs-handler";
import { AppToaster } from "../../lib/toaster/AppToaster";
import { useSaveQueryEvent } from "./useSaveQueryEvent";

export const useSaveQuery = () => {
  const { markAsSaved, sqlEditorRef, jsonEditorRef } = useTabsContext();
  const { emitSaveQueryEvent } = useSaveQueryEvent();

  const saveQuery = useCallback(
    async (
      tab?: Tab,
      successMessage = "Query saved",
      error = "Failed to save query"
    ) => {
      if (!tab) {
        AppToaster.top.error("No tab to save");
        return;
      }
      try {
        if (tab.isNew) {
          await queryRepo.insert(tab);
        } else {
          await queryRepo.update(tab.id, {
            ...tab,
            sql: sqlEditorRef.current?.getValue() ?? "",
            params: jsonEditorRef.current?.getValue() ?? "",
          });
        }
        markAsSaved();
        emitSaveQueryEvent(undefined);
        AppToaster.topRight.success(successMessage);
      } catch (e) {
        AppToaster.top.error(error);
      }
    },
    [sqlEditorRef, jsonEditorRef, markAsSaved]
  );

  return [saveQuery];
};
