import { Query } from "../../lib/backend-repos/query-repo";
import { useEvent } from "../common/useEvent";

export type DeletedQueryPayload = {
  id?: Query["id"];
};

export const useDeletedQueryEvent = () => {
  const { emitEvent, useEventListener } =
    useEvent<DeletedQueryPayload>("deleted-query");

  return {
    emitDeletedQueryEvent: emitEvent,
    useDeletedQueryEventListener: useEventListener,
  };
};
