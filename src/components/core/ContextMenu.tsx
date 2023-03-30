import { hideContextMenu, showContextMenu } from "@blueprintjs/popover2";
import {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { useThemeContext } from "../../contexts/useThemeContext";

type MenuFn = (hide: () => void) => ReactElement;

type Props = {
  menu: ReactElement | MenuFn;
};

export type ContextMenuRef = {
  hide: () => void;
};

const ContextMenu = forwardRef<ContextMenuRef, PropsWithChildren<Props>>(
  ({ children, menu }, ref) => {
    const { theme } = useThemeContext();

    useImperativeHandle(ref, () => ({
      hide: hideContextMenu,
    }));

    const content = useMemo(() => {
      return typeof menu === "function" ? menu(hideContextMenu) : menu;
    }, [menu]);

    const handleContextMenu = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        showContextMenu({
          content,
          isDarkTheme: theme === "dark",
          onClose: hideContextMenu,
          popoverClassName: "!outline-none",
          targetOffset: {
            left: event.clientX,
            top: event.clientY,
          },
        });
      },
      []
    );

    return (
      <div className="w-full h-full" onContextMenu={handleContextMenu}>
        {children}
      </div>
    );
  }
);

export default ContextMenu;
