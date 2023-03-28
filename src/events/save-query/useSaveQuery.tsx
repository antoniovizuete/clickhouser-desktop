import { Spinner } from "@blueprintjs/core";
import { useCallback } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { queryRepo } from "../../lib/backend-repos/query-repo";
import { Tab } from "../../lib/tabs-handler";
import { AppToaster } from "../../lib/toaster/AppToaster";
import { useSavedQueryEvent } from "../saved-query/useSavedQueryEvent";

export const useSaveQuery = () => {
  const { markAsSaved, sqlEditorRef, jsonEditorRef } = useTabsContext();
  const { emitSavedQueryEvent } = useSavedQueryEvent();

  const saveQuery = useCallback(
    async (
      tab?: Tab,
      successMessage = "Query saved",
      error = "Failed to save query"
    ) => {
      const loadingToastKey = AppToaster.topRight.info({
        icon: <Spinner intent="primary" size={12} />,
        message: "Saving query...",
      });

      if (!tab) {
        AppToaster.topRight.dismiss(loadingToastKey);
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
        AppToaster.topRight.dismiss(loadingToastKey);
        AppToaster.topRight.success(successMessage);
      } catch (e) {
        AppToaster.topRight.dismiss(loadingToastKey);
        AppToaster.topRight.error(error);
      }
    },
    [sqlEditorRef, jsonEditorRef, markAsSaved]
  );

  return [saveQuery];
};
