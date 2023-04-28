import {
  CloseKind,
  CloseTabOverloadParams,
  CloseTabOverloadParamsIdDependent,
} from "./types";

export const isIdDependentCloseKind = (
  params: CloseTabOverloadParams
): params is CloseTabOverloadParamsIdDependent => {
  const { kind } = params;
  return (
    kind === CloseKind.CloseTab ||
    kind === CloseKind.CloseOtherTabs ||
    kind === CloseKind.CloseTabsToTheRight
  );
};
