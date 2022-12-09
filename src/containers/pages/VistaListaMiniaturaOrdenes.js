import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Colxx } from '../../components/common/CustomBootstrap';
import { getImagen } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import mapEstados from '../../constants/mapEstados';

const VistaListaMiniaturaOrdenes = ({
  item,
  collect,
  editItem,
  getFunctionalities,
}) => {
  const { url } = useRouteMatch();
  const { estadosOrden } = mapEstados;

  if (item.glosa?.startsWith('-')) return <></>;

  let { glosa } = item;
  if (item.ap_paterno)
    glosa = `${item.nombre} ${item.ap_paterno} ${item.ap_materno}`;

  let { descripcion } = item;

  if (item.destino) {
    const today = new Date(item.fecha_creacion);
    const formattedDate = format(today, 'dd.MM.yyyy');
    descripcion = formattedDate;
    glosa =
      item.glosa_bodega_origen === null
        ? item.glosa_proveedor_origen
        : item.glosa_bodega_origen;
  }

  const colorBadge = estadosOrden[item.id_estado] ?? estadosOrden.default;

  return (
    <Colxx xxs="12" key={item.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className={classNames('d-flex flex-row')}>
          <NavLink to={`${url}/${item.id}`} className="d-flex">
            <img
              alt={item.glosa}
              src={getImagen(item.datos_adicionales?.imgURL)}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${url}/${item.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">{glosa}</p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {descripcion}
              </p>
              <div className="w-15 w-sm-100 text-center">
                <Badge color={colorBadge} pill>
                  {item.glosa_estado.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="w-20 custom-control custom-checkbox pl-1 align-self-center pr-4">
              {getFunctionalities(item.id)?.canAssignUser && (
                <Button
                  className="col-xl-12 btn-xs"
                  color="secondary"
                  outline
                  onClick={() => editItem(item.id)}
                >
                  <i className="simple-icon-user" />{' '}
                  <IntlMessages id="contextmenu.asignar-usuario" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(VistaListaMiniaturaOrdenes);
