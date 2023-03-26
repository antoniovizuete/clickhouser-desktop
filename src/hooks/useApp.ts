import { useEffect, useReducer } from "react";
import {
  initialSideBarState,
  sideBarReducer,
} from "../reducers/sidebar-reducer";
import { useHotKeys } from "./useHotKeys";

export const useApp = () => {
  const { registerGlobalHotKeys } = useHotKeys();

  useEffect(() => {
    (async () => {
      await registerGlobalHotKeys();
    })();
  }, []);

  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    initialSideBarState
  );

  return {
    sideBarState,
    sideBarDispatch,
  };
};
