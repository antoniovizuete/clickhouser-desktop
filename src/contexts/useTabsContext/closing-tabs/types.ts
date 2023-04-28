import { TabAction } from "../../../lib/tabs-handler";

export enum CloseKind {
  CloseAllTabs = TabAction.CLOSE_ALL_TABS,
  CloseOtherTabs = TabAction.CLOSE_OTHER_TABS,
  CloseTab = TabAction.CLOSE_TAB,
  CloseTabsToTheRight = TabAction.CLOSE_TABS_TO_THE_RIGHT,
}

export type CloseKindIdDependant = Extract<
  CloseKind,
  CloseKind.CloseTab | CloseKind.CloseOtherTabs | CloseKind.CloseTabsToTheRight
>;

export type CloseKindNoIdDependant = Extract<CloseKind, CloseKind.CloseAllTabs>;

export type CloseTabOverloadParamsIdDependent = {
  kind: CloseKindIdDependant;
  id: string;
};

export type CloseTabOverloadParams =
  | CloseTabOverloadParamsIdDependent
  | {
      kind: CloseKindNoIdDependant;
    };
