/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { format } from 'date-fns';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { Colxx } from '../../components/common/CustomBootstrap';
import { getImagen } from '../../helpers/Utils';
import { ESTADOS_USUARIO } from '../../constants/enums';
import IntlMessages from '../../helpers/IntlMessages';

const VistaListaMiniatura = ({ item, collect, editItem, functionalities }) => {
  const { url } = useRouteMatch();

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

  let colorBadge = 'primary';
  let glosaBatch = 'Activo';

  if (item.activo !== undefined && !item.activo) {
    colorBadge = 'secondary';
    glosaBatch = 'Desactivado';
  }
  if (item.glosa_estado !== undefined) {
    glosaBatch = item.glosa_estado;
  }

  if (item.rut)
    descripcion = formatRut(item.rut + item.dv, RutFormat.DOTS_DASH);
  else if (item.email) {
    descripcion = item.email;

    if (item.id_estado === ESTADOS_USUARIO.BLOQUEDADO) glosaBatch = 'Bloqueado';
    if (item.id_estado === ESTADOS_USUARIO.ELIMINADO) glosaBatch = 'Eliminado';

    colorBadge =
      item.id_estado === ESTADOS_USUARIO.ACTIVO && !item.rut
        ? 'primary'
        : 'secondary';
  }

  return (
    <Colxx xxs="12" key={item.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className={classnames('d-flex flex-row')}>
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
              <div className="w-15 w-sm-100">
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

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(VistaListaMiniatura);
