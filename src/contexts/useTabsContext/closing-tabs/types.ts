export enum CloseKind {
  CloseAllTabs = "CLOSE_ALL_TABS",
  CloseOtherTabs = "CLOSE_OTHER_TABS",
  CloseTab = "CLOSE_TAB",
  CloseTabsToTheRight = "CLOSE_TABS_TO_THE_RIGHT",
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
