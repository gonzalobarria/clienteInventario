import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const VistaListaInfo = ({ item, collect, editItem, functionalities }) => {
  const { url } = useRouteMatch();

  if (item.glosa.startsWith('-')) return <></>;

  let colorBadge = 'primary';
  let glosaBatch = 'Activo';

  if (item.activo !== undefined && !item.activo) {
    colorBadge = 'secondary';
    glosaBatch = 'Desactivado';
  }
  if (item.glosa_estado !== undefined) {
    glosaBatch = item.glosa_estado;
  }

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${url}/${item.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">{item.glosa}</p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {item.descripcion}
              </p>
              <div className="w-15 w-sm-100 text-center">
                <Badge color={colorBadge} pill>
                  {glosaBatch.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              {functionalities?.canEdit && (
                <Button
                  className="col-xl-12 btn-xs"
                  color="secondary"
                  outline
                  onClick={() => editItem(item.id)}
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

export default React.memo(VistaListaInfo);
