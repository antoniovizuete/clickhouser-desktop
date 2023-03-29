import { Reducer } from "react";
import { ToggleSidebarEventVariants } from "../events/toggle-sidebar/useToggleSidebarEvent";

export enum SideBarAction {
  TOGGLE = "TOGGLE",
  TOGGLE_FROM_EVENT = "TOGGLE_FROM_EVENT",
}

export type SideBarSections = "connection" | "query";

type SideBarState = {
  [property in SideBarSections as `is${Capitalize<
    property & string
  >}SectionOpen`]: boolean;
};

type SideBarActions =
  | {
      type: SideBarAction.TOGGLE;
      payload: { section: SideBarSections };
    }
  | {
      type: SideBarAction.TOGGLE_FROM_EVENT;
      payload: { section: ToggleSidebarEventVariants };
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
      return toggleSection(state, action.payload.section);
    case SideBarAction.TOGGLE_FROM_EVENT:
      return toggleSection(
        state,
        transformToggleSidebarEventVariantsToSideBarSection(
          action.payload.section
        )
      );
  }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const toggleSection = (
  state: SideBarState,
  section: SideBarSections
): SideBarState => {
  const sectionKey = `is${capitalize(
    section
  )}SectionOpen` as keyof SideBarState;
  return {
    ...Object.fromEntries(Object.keys(state).map((key) => [key, false])),
    [sectionKey]: !state[sectionKey],
  } as SideBarState;
};

const transformToggleSidebarEventVariantsToSideBarSection = (
  variant: ToggleSidebarEventVariants
): SideBarSections => variant.split("toggle-panel-")[1] as SideBarSections;
