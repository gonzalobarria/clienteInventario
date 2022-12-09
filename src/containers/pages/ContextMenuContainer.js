import React, { useState } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { injectIntl } from 'react-intl';

const ContextMenuContainer = ({
  onContextMenu,
  onContextMenuClick,
  intl,
  getFunctionalities,
}) => {
  const { messages } = intl;
  const [functionalities, setFunctionalities] = useState(false);
  return (
    <ContextMenu
      id="menu_id"
      onShow={(e) => {
        onContextMenu(e, e.detail.data);
        if (getFunctionalities)
          setFunctionalities(getFunctionalities(e.detail.data.data));
      }}
    >
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: 'copy' }}>
        <i className="simple-icon-docs" /> 
        <span>{messages['contextmenu.copiar']}</span>
      </MenuItem> */}
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
        <i className="simple-icon-drawer" /> <span>Move to archive</span>
      </MenuItem> */}
      {functionalities?.canAssignUser && (
        <MenuItem onClick={onContextMenuClick} data={{ action: 'assignUser' }}>
          <i className="simple-icon-user" />
          <span>{messages['contextmenu.asignar-usuario']}</span>
        </MenuItem>
      )}
      {functionalities?.canEdit && (
        <MenuItem onClick={onContextMenuClick} data={{ action: 'edit' }}>
          <i className="simple-icon-note" />
          <span>{messages['contextmenu.editar']}</span>
        </MenuItem>
      )}
      {functionalities?.canDelete && (
        <MenuItem onClick={onContextMenuClick} data={{ action: 'delete' }}>
          <i className="simple-icon-trash large-icon" />
          <span>{messages['contextmenu.eliminar']}</span>
        </MenuItem>
      )}
    </ContextMenu>
  );
};

export default injectIntl(ContextMenuContainer);
