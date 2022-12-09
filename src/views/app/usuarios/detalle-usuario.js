import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { injectIntl } from 'react-intl';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getImagen } from '../../../helpers/Utils';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';
import useUsuario from '../../../hooks/usuarios/use-usuario';

const DetalleUsuario = ({ match }) => {
  const {
    params: { idUsuario },
  } = match;

  const { usuario, isLoading, subirFoto } = useUsuario(idUsuario);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>
          {usuario.nombre} {usuario.ap_paterno} {usuario.ap_materno}
        </h1>

        <Breadcrumb match={match} />
        <Separator className="mb-5" />

        <Row>
          <Colxx xxs="12" lg="4" className="mb-4">
            <Card className="mb-4">
              <ImagenDetalle
                src={getImagen(usuario.datos_adicionales?.imgURL)}
                folder="fotosUsuarios"
                id={idUsuario}
                idTitle="idUsuario"
                subirFoto={subirFoto}
              />

              <CardBody>
                <DetalleAtributo titulo="usuario.email" item={usuario.email} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleUsuario);
