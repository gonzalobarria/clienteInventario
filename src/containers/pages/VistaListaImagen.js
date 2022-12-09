import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge,
} from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { format } from 'date-fns';
import { Colxx } from '../../components/common/CustomBootstrap';
import { getImagen } from '../../helpers/Utils';
import { ESTADOS_USUARIO } from '../../constants/enums';

const VistaListaImagen = ({ item, isSelect, collect }) => {
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
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={item.id}>
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card>
          <div className="position-relative">
            <NavLink to={`${url}/${item.id}`} className="w-40 w-sm-100">
              <CardImg
                top
                alt={item.glosa}
                src={getImagen(item.datos_adicionales?.imgURL)}
              />
            </NavLink>
            <Badge
              color={colorBadge}
              pill
              className="position-absolute badge-top-left"
            >
              {glosaBatch.toUpperCase()}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${item.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{glosa}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {descripcion}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(VistaListaImagen);
