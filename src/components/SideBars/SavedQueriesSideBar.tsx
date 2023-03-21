import { Icon } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useSaveQueryEvent } from "../../hooks/useSaveQueryEvent";
import { Query, queryRepo } from "../../lib/backend-repos/query-repo";
import ClickableIcon from "../core/ClickableIcon";


export default function SavedQueriesSideBar() {
  const { restoreTab } = useTabsContext();
  const [queries, setQueries] = useState<Query[]>([]);
  const { useSaveQueryEventListen } = useSaveQueryEvent();

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

  const handleOnClickQuery = (query: Query) => {
    restoreTab(query)
  }

  return (
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
            <ClickableIcon icon="trash" className="opacity-0 group-hover:opacity-100 hover:scale-110 hover:text-red-600" />
          </div>
        ))}
      </div>
    </div>
  )
}
