import React from 'react';
import { Card, Badge, Button } from 'reactstrap';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { format } from 'date-fns';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import mapEstados from '../../constants/mapEstados';
import useOrdenPDF from '../../hooks/descargables/use-orden-pdf';

const VistaListaInfoOrdenes = ({
  item,
  collect,
  editItem,
  getFunctionalities,
}) => {
  const { url } = useRouteMatch();
  const { estadosOrden } = mapEstados;
  const { setDescargaPDF } = useOrdenPDF(item.id);

  const glosa =
    item.glosa_bodega_origen === null
      ? item.glosa_proveedor_origen
      : item.glosa_bodega_origen;

  const today = new Date(item.fecha_creacion);
  const formattedDate = format(today, 'dd.MM.yyyy');

  const colorBadge = estadosOrden[item.id_estado] ?? estadosOrden.default;

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${url}/${item.id}`} className="w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {glosa ?? 'Pre-Orden'}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {item.destino}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {formattedDate}
              </p>
              <div className="w-35 w-sm-100 text-lg-center">
                <Badge color={colorBadge} pill>
                  {item.glosa_estado.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4 w-20">
              {getFunctionalities(item.id)?.canAssignUser ? (
                <Button
                  className="col-xl-12 btn-xs"
                  color="secondary"
                  outline
                  onClick={() => editItem(item.id)}
                >
                  <div className="d-none d-sm-block">
                    <i className="simple-icon-user" />{' '}
                    <IntlMessages id="contextmenu.asignar-usuario" />
                  </div>
                  <div className="d-block d-sm-none">
                    <i className="simple-icon-user" />
                  </div>
                </Button>
              ) : (
                getFunctionalities(item.id)?.canPrintPDF && (
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
                )
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(VistaListaInfoOrdenes);
