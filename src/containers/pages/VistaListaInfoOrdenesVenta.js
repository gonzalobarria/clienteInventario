import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { priceFormat } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { TIPOS_VENTA_OV } from '../../constants/enums';
import useOrdenVentaPDF from '../../hooks/descargables/use-orden-venta-pdf';

const VistaListaInfoOrdenesVenta = ({ item, collect }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { setDescargaPDF } = useOrdenVentaPDF(item);

  if (item.glosa.startsWith('-')) return <></>;

  let colorBadge = 'primary';
  let glosaBatch = 'Activo';

  if (item.activo !== undefined && !item.activo) {
    colorBadge = 'secondary';
    glosaBatch = 'Desactivado';
  }

  if (item.glosa_estado !== undefined) glosaBatch = item.glosa_estado;

  if (item.id_tipo_venta === TIPOS_VENTA_OV.COTIZACION) {
    colorBadge = 'secondary';
    glosaBatch = 'Cotización';
  }

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${url}/${item.id}`} className="w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.id_orden_venta}
                </p>
              </NavLink>
              <p className="mb-1 text-small2 w-30 w-sm-100 text-lg-right">
                {item.fecha_creacion}
              </p>
              <p className="mb-1 text-small2 w-30 w-sm-100 text-lg-right">
                {priceFormat(item.total_venta)}
              </p>
              <div className="w-30 w-sm-100 text-lg-center">
                <Badge color={colorBadge} pill>
                  {glosaBatch.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <Button
                className="col-xl-12 btn-xs"
                color="secondary"
                outline
                onClick={() => {
                  if (item.id_cliente)
                    history.push({
                      pathname: `/app/clientes/${item.id_cliente}/pos-cliente`,
                      state: {
                        idOrdenVenta: item.id,
                        idCliente: item.id_cliente,
                      },
                    });
                  else
                    history.push({
                      pathname: '/app/pos',
                      state: { idOrdenVenta: item.id },
                    });
                }}
              >
                <i className="simple-icon-note" />{' '}
                <IntlMessages id="button.repetir-voucher" />
              </Button>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <Button
                className="col-xl-12 btn-xs"
                color="success"
                onClick={() => setDescargaPDF(true)}
              >
                <div className="d-none d-sm-block">
                  <i className="simple-icon-printer" />{' '}
                  <IntlMessages id="contextmenu.imprimir-orden" />
                </div>
                <div className="d-block d-sm-none">
                  <i className="simple-icon-printer" />
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(VistaListaInfoOrdenesVenta);
