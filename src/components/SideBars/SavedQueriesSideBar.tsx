import { Button, Classes, Dialog, Icon } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useThemeContext } from "../../contexts/useThemeContext";
import { useSaveQueryEvent } from "../../hooks/useSaveQueryEvent";
import { Query, queryRepo } from "../../lib/backend-repos/query-repo";
import { AppToaster } from "../../lib/toaster/AppToaster";
import ClickableIcon from "../core/ClickableIcon";


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
  }

  useEffect(() => {
    retrieveQueries();
  }, []);

  useSaveQueryEventListen(() => {
    retrieveQueries();
  }, []);

  const handleOnClickRemoveQuery = (query: Query) => {
    setQueryToRemove(query);
    setIsAlertOpen(true);
  }

  const handleOnClickQuery = (query: Query) => {
    restoreTab(query)
  }

  const closeAlert = () => {
    setIsAlertOpen(false);
  }

  const handleOnClickConfirmRemoveQuery = async () => {
    if (queryToRemove) {
      queryRepo.delete(queryToRemove.id);
      retrieveQueries();
      closeAlert();
      AppToaster.top.warn(`Query "${queryToRemove.name}" removed`);
    }
  }
  return (<>
    <div className="w-full h-full pt-2 flex flex-col justify-start items-start bg-stone-50 dark:bg-stone-900">
      <h2 className="pl-4 py-3 text-stone-600 dark:text-stone-300 uppercase text-xs font-semibold">Saved queries</h2>
      <div className="pl-2 flex-grow flex flex-col justify-start items-start w-full">
        {queries.map(query => (
          <div
            key={query.id}
            className="w-full group flex justify-start items-center px-2 text-stone-600 dark:text-stone-400 gap-2 hover:font-bold hover:cursor-pointer"
          >
            <div className="flex-grow" onClick={() => handleOnClickQuery(query)}>
              <Icon icon="console" className="mr-2" />
              {query.name}
            </div>
            <ClickableIcon
              icon="delete"
              className="opacity-0 group-hover:opacity-100 hover:scale-110 hover:text-red-600"
              onClick={() => handleOnClickRemoveQuery(query)}
            />
          </div>
        ))}
      </div>
    </div>
    <Dialog
      icon="warning-sign"
      className={bpTheme}
      isOpen={isAlertOpen}
      onClose={closeAlert}
      title="Unsaved query"
    ><div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-3`}>

        <div>You are going to remove the "<span className='font-bold'>{queryToRemove?.name}</span>" query. The query data will be lost after clicking on 'Yes, remove it'.</div>

        <div>Are you sure you want to remove the query?</div>
      </div><div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={closeAlert} type={"button"}>
            Cancel
          </Button>
          <Button intent="danger" type="submit" onClick={handleOnClickConfirmRemoveQuery}>
            Yes, remove it
          </Button>
        </div>
      </div></Dialog>
  </>
  )
}
