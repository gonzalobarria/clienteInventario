import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import { ESTADOS_USUARIO } from '../../constants/enums';
import IntlMessages from '../../helpers/IntlMessages';

const VistaListaInfoUsuario = ({
  item,
  collect,
  editItem,
  functionalities,
}) => {
  const { url } = useRouteMatch();

  let colorBadge = 'secondary';
  let glosaEstado = '';

  if (item.id_estado === ESTADOS_USUARIO.ACTIVO) {
    glosaEstado = 'Activo';
    colorBadge = 'primary';
  }
  if (item.id_estado === ESTADOS_USUARIO.BLOQUEDADO) glosaEstado = 'Bloqueado';
  if (item.id_estado === ESTADOS_USUARIO.ELIMINADO) glosaEstado = 'Eliminado';

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${url}/${item.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.nombre} {item.ap_paterno} {item.ap_materno}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {item.email}
              </p>
              <div className="w-15 w-sm-100 text-center">
                <Badge color={colorBadge} pill>
                  {glosaEstado.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              {functionalities?.canEdit && (
                <Button
                  className="col-xl-12 btn-xs"
                  color="secondary"
                  outline
                  onClick={() => editItem(item)}
                >
                  <i className="simple-icon-note" />{' '}
                  <IntlMessages id="contextmenu.editar" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(VistaListaInfoUsuario);
