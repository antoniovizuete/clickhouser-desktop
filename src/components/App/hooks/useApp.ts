import { listen } from "@tauri-apps/api/event";
import { useEffect, useReducer } from "react";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useSaveQuery } from "../../../events/save-query/useSaveQuery";
import { useToggleSidebarEvent } from "../../../events/toggle-sidebar/useToggleSidebarEvent";
import {
  initialSideBarState,
  SideBarAction,
  sideBarReducer,
} from "../../../reducers/sidebar-reducer";

export const useApp = () => {
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    initialSideBarState
  );

  const { getActiveTab } = useTabsContext();
  const [saveQuery] = useSaveQuery();

  useEffect(() => {
    let sub = listen("save-query", () => {
      const tab = getActiveTab();
      saveQuery(tab);
    });
    return () => {
      sub.then((unlisten) => unlisten?.());
    };
  }, [saveQuery, getActiveTab]);

  useToggleSidebarEvent().useToggleSidebarEventListener((event) => {
    sideBarDispatch({
      type: SideBarAction.TOGGLE_FROM_EVENT,
      payload: {
        section: event.payload,
      },
    });
  }, []);

  return {
    sideBarState,
    sideBarDispatch,
  };
};
