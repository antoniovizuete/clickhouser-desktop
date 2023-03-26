import { Button, Classes, Dialog } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { useSaveQueryEvent } from "../../../events/save-query/useSaveQueryEvent";
import { Query, queryRepo } from "../../../lib/backend-repos/query-repo";
import { AppToaster } from "../../../lib/toaster/AppToaster";
import ClickableIcon from "../../core/ClickableIcon";
import SideBar from "../SideBar";
import SideBarEmptyState from "../SideBarEmptyState";
import SideBarItem from "../SideBarItem";

export default function SavedQueriesSideBar() {
  const { bpTheme } = useThemeContext();
  const { restoreTab } = useTabsContext();
  const { useSaveQueryEventListen } = useSaveQueryEvent();

  const [queries, setQueries] = useState<Query[]>([]);
  const [queryToRemove, setQueryToRemove] = useState<Query | undefined>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const retrieveQueries = async () => {
    const rawQueries = await queryRepo.get();
    setQueries(rawQueries);
  };

  useEffect(() => {
    retrieveQueries();
  }, []);

  useSaveQueryEventListen(() => {
    retrieveQueries();
  }, []);

  const handleOnClickRemoveQuery = (query: Query) => {
    setQueryToRemove(query);
    setIsAlertOpen(true);
  };

  const handleOnClickQuery = (query: Query) => {
    restoreTab(query);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const handleOnClickConfirmRemoveQuery = async () => {
    if (queryToRemove) {
      queryRepo.delete(queryToRemove.id);
      retrieveQueries();
      closeAlert();
      AppToaster.top.warn(`Query "${queryToRemove.name}" removed`);
    }
  };
  return (
    <>
      <SideBar icon="console" title="Saved queries">
        {queries.length > 0 &&
          queries.map((query) => (
            <SideBarItem
              key={query.id}
              tooltip={query.name}
              right={
                <ClickableIcon
                  icon="delete"
                  className="opacity-0 group-hover:opacity-100 hover:scale-110"
                  onClick={() => handleOnClickRemoveQuery(query)}
                />
              }
              onClick={() => handleOnClickQuery(query)}
              caption={query.name}
            />
          ))}
        {queries.length === 0 && (
          <SideBarEmptyState text="You don't have any saved queries yet." />
        )}
      </SideBar>
      <Dialog
        icon="warning-sign"
        className={bpTheme}
        isOpen={isAlertOpen}
        onClose={closeAlert}
        title="Unsaved query"
      >
        <div
          className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-3`}
        >
          <div>
            You are going to remove the "
            <span className="font-bold">{queryToRemove?.name}</span>" query. The
            query data will be lost after clicking on 'Yes, remove it'.
          </div>
          <div>Are you sure you want to remove the query?</div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={closeAlert} type={"button"}>
              Cancel
            </Button>
            <Button
              intent="danger"
              type="submit"
              onClick={handleOnClickConfirmRemoveQuery}
            >
              Yes, remove it
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
