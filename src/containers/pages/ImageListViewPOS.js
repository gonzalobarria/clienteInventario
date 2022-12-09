import React from 'react';
import { Row, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import ThumbnailImage from '../../components/cards/ThumbnailImage';
import { getImagen, numberFormat } from '../../helpers/Utils';

const ImageListViewPOS = ({ producto, addItem }) => {
  const getNumUnidades = (cant) =>
    `${cant} ${cant === 1 ? 'ud.' : 'uds.'} por paq.`;

  return (
    <Colxx sm="12" lg="6" xl="4" className="mb-3">
      <Card onClick={() => addItem(producto)}>
        <CardBody>
          <Row>
            <Colxx xxs="12">
              <CardTitle className="text-one font-weight-semibold mb-2">
                {producto.glosa}
                <CardText className="text-muted">
                  {getNumUnidades(producto.unidades_venta)}
                </CardText>
              </CardTitle>
              <div className="d-md-inline-block">
                <CardText className="text-muted text-small d-md-inline-block va-top">
                  $
                </CardText>
                <CardText className="color-theme-1 text-onefive mb-0 font-weight-bold d-md-inline-block">
                  {numberFormat(producto.precio_detalle)}
                </CardText>
                <CardText
                  className={`mb-2 ${
                    producto.stock_disponible === 0
                      ? 'text-danger font-weight-bold text-one'
                      : ''
                  }`}
                >
                  Stock:{' '}
                  {producto.stock_disponible > 0
                    ? `${numberFormat(producto.stock_disponible)} paq.`
                    : 'Sin Stock'}
                </CardText>
              </div>
              <ThumbnailImage
                src={getImagen(producto.datos_adicionales?.imgURL)}
                alt={producto.glosa}
                className="float-md-right lthumb"
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default React.memo(ImageListViewPOS);
