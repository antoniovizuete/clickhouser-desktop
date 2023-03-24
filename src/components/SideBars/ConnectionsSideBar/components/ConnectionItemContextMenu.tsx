import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { hideContextMenu, showContextMenu } from "@blueprintjs/popover2";
import { PropsWithChildren, useCallback } from 'react';
import { useThemeContext } from '../../../../contexts/useThemeContext';
import { Connection } from '../../../../lib/clickhouse-clients';


type Props = {
  connection: Connection;
  onConnectClick: (connection: Connection) => void;
  onEditClick: (connection: Connection) => void;
  onRemoveClick: (connection: Connection) => void;
};

export default function ConnectionItemContextMenu({ children, connection, onConnectClick, onEditClick, onRemoveClick }: PropsWithChildren<Props>) {
  const { theme } = useThemeContext();
  const handleClose = useCallback(() => {
    hideContextMenu();
  }, []);

  const handleOnConnect = useCallback(() => {
    onConnectClick(connection);
    handleClose();
  }, [connection]);

  const handleOnEdit = useCallback(() => {
    onEditClick(connection);
    handleClose();
  }, [connection]);

  const handleOnRemove = useCallback(() => {
    onRemoveClick(connection);
  }, [connection]);

  const menu = (
    <Menu>
      <MenuItem icon="link" text="Connect" onClick={handleOnConnect} />
      <MenuDivider />
      <MenuItem icon="edit" text="Edit..." onClick={handleOnEdit} />
      <MenuItem icon="cross" intent="danger" text="Remove" onClick={handleOnRemove} />
    </Menu>
  );

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showContextMenu({
      content: menu,
      isDarkTheme: theme === 'dark',
      onClose: handleClose,
      targetOffset: {
        left: event.clientX,
        top: event.clientY,
      },
    });
  }, []);

  return (
    <div className='w-full' onContextMenu={handleContextMenu}>
      {children}
    </div>
  );
}
