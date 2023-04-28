import { TabAction } from "../../../lib/tabs-handler";
import {
  CloseKind,
  CloseKindIdDependant,
  CloseKindNoIdDependant,
} from "./types";

export const closeKindToTabActionIdDependantMap: Record<
  CloseKindIdDependant,
  Extract<
    TabAction,
    | TabAction.CLOSE_OTHER_TABS
    | TabAction.CLOSE_TAB
    | TabAction.CLOSE_TABS_TO_THE_RIGHT
  >
> = {
  [CloseKind.CloseOtherTabs]: TabAction.CLOSE_OTHER_TABS,
  [CloseKind.CloseTab]: TabAction.CLOSE_TAB,
  [CloseKind.CloseTabsToTheRight]: TabAction.CLOSE_TABS_TO_THE_RIGHT,
};

export const closeKindToTabActionNoIdDependantMap: Record<
  CloseKindNoIdDependant,
  Extract<TabAction, TabAction.CLOSE_ALL_TABS>
> = {
  [CloseKind.CloseAllTabs]: TabAction.CLOSE_ALL_TABS,
};
