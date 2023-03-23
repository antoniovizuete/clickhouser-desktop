import { Reducer } from "react";

export enum SideBarAction {
  TOGGLE = "TOGGLE",
}

type SideBarSections = "connection" | "query";

type SideBarState = {
  [property in SideBarSections as `is${Capitalize<
    property & string
  >}SectionOpen`]: boolean;
};

type SideBarActions = {
  type: SideBarAction;
  payload: { section: SideBarSections };
};

export const initialSideBarState: SideBarState = {
  isConnectionSectionOpen: false,
  isQuerySectionOpen: false,
};

export const sideBarReducer: Reducer<SideBarState, SideBarActions> = (
  state,
  action
): SideBarState => {
  switch (action.type) {
    case SideBarAction.TOGGLE:
      return toggleSection(state, action);
  }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const toggleSection = (
  state: SideBarState,
  action: SideBarActions
): SideBarState => {
  const { section } = action.payload;
  const sectionKey = `is${capitalize(
    section
  )}SectionOpen` as keyof SideBarState;
  return {
    ...Object.fromEntries(Object.keys(state).map((key) => [key, false])),
    [sectionKey]: !state[sectionKey],
  } as SideBarState;
};
