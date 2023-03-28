import { useReducer } from "react";
import {
  initialSideBarState,
  sideBarReducer,
} from "../../../reducers/sidebar-reducer";

export const useApp = () => {
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    initialSideBarState
  );

  return {
    sideBarState,
    sideBarDispatch,
  };
};
