import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { hideContextMenu, showContextMenu } from "@blueprintjs/popover2";
import { MouseEventHandler } from "react";
import { CloseKind, useTabsContext } from "../../../contexts/useTabsContext";
import { useThemeContext } from "../../../contexts/useThemeContext";

const getLiElement = (target: HTMLElement): HTMLElement | null => {
  if (target.tagName === "LI") {
    return target;
  }
  if (target.parentElement) {
    return getLiElement(target.parentElement);
  }
  return null;
};

export const useTabElementContextMenu = () => {
  const { theme } = useThemeContext();
  const { closeTab, duplicateTab } = useTabsContext();

  const handleOnContextMenu: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const topElement = getLiElement(e.target as HTMLElement);
    if (!topElement) {
      return;
    }
    const id = topElement.dataset.id;
    if (!id) {
      return;
    }
    showContextMenu({
      content: (
        <Menu>
          <MenuItem
            text="Close"
            onClick={() => closeTab({ kind: CloseKind.CloseTab, id })}
            label="Cmd+W"
          />
          <MenuItem
            text="Close others"
            onClick={() => closeTab({ kind: CloseKind.CloseOtherTabs, id })}
          />
          <MenuItem
            text="Close to the right"
            onClick={() =>
              closeTab({ kind: CloseKind.CloseTabsToTheRight, id })
            }
          />
          <MenuItem
            text="Close all"
            onClick={() => closeTab({ kind: CloseKind.CloseAllTabs })}
          />

          <MenuDivider />
          <MenuItem text="Duplicate tab" onClick={() => duplicateTab(id)} />
        </Menu>
      ),
      isDarkTheme: theme === "dark",
      targetOffset: { left: e.clientX, top: e.clientY },
      onClose: () => {
        hideContextMenu();
      },
    });
  };

  return {
    handleOnContextMenu,
  };
};
