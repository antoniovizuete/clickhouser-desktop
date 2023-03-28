import { useCallback } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { queryRepo } from "../../lib/backend-repos/query-repo";
import { Tab } from "../../lib/tabs-handler";
import { AppToaster } from "../../lib/toaster/AppToaster";
import { useSavedQueryEvent } from "../saved-query/useSavedQueryEvent";
import { useSaveQueryEvent } from "./useSaveQueryEvent";

export const useSaveQuery = () => {
  const { markAsSaved, sqlEditorRef, jsonEditorRef, getActiveTab } =
    useTabsContext();
  const { emitSavedQueryEvent } = useSavedQueryEvent();
  const { useSaveQueryEventListener } = useSaveQueryEvent();

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
        emitSavedQueryEvent(undefined);
        AppToaster.topRight.success(successMessage);
      } catch (e) {
        AppToaster.top.error(error);
      }
    },
    [sqlEditorRef, jsonEditorRef, markAsSaved]
  );

  useSaveQueryEventListener(async () => {
    const tab = getActiveTab();
    await saveQuery(tab);
  }, [saveQuery, getActiveTab]);

  return [saveQuery];
};
