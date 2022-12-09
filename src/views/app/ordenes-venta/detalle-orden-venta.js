/* eslint-disable no-shadow */
/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Row, Card, CardBody, Table } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { getOrdenVenta } from '../../../redux/actions';
import { priceFormat } from '../../../helpers/Utils';
import { METODOS_PAGO, TIPOS_VENTA } from '../../../constants/enums';
import useProductosOrdenVenta from '../../../hooks/ordenes-venta/use-productos-orden-venta';

const DetalleOrdenVenta = ({ match, intl }) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  const {
    params: { idOrdenVenta },
  } = match;

  const { orden, loadingOrden, error } = useSelector(
    ({ ordenVentaApp }) => ({
      orden: ordenVentaApp.orden,
      loadingOrden: ordenVentaApp.loading,
      error: ordenVentaApp.error,
    }),
    shallowEqual
  );

  const { productosOrdenVenta, isLoading } = useProductosOrdenVenta(
    idOrdenVenta
  );

  useEffect(() => {
    dispatch(getOrdenVenta(idOrdenVenta));
  }, [dispatch, idOrdenVenta]);

  if (error) return <Redirect to="/unauthorized" />;

  return !loadingOrden ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <Breadcrumb heading="menu.detalle-orden-venta" match={match} />

        <Row className="invoice-react">
          <Colxx xxs="12" className="mb-4">
            <Card className="mb-5">
              <CardBody className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-lg-row justify-content-between pt-2 pb-2">
                    <div className=" align-self-center w-70">
                      <img
                        src="/assets/logos/black.svg"
                        alt="Logo"
                        width="200px;"
                      />
                    </div>
                    <div className=" w-30 text-right align-self-center">
                      <p className="text-small text-semi-muted mb-0">
                        Antonia Lopez de Bello 743 Recoleta, Santiago
                      </p>
                    </div>
                  </div>
                  <div className="border-bottom pt-4 mb-5" />

                  <div className="d-flex flex-row justify-content-between mb-5">
                    <div className="d-flex flex-column w-40  w-sm-100 p-4 text-semi-muted bg-semi-muted">
                      <p className="mb-0">
                        Orden de Venta: {orden.id_orden_venta}
                      </p>
                      <p className="mb-0">
                        Fecha de Compra: {orden.fecha_creacion}
                      </p>
                      {orden.id_tipo_pago !== METODOS_PAGO.COTIZACION ? (
                        <p className="mb-0">
                          Método de Pago: {orden.glosa_tipo_pago}
                        </p>
                      ) : (
                        <p className="mb-0">Cotización</p>
                      )}
                    </div>
                  </div>
                  <Table borderless>
                    <thead>
                      <tr>
                        <th className="text-muted text-small w-35">
                          {messages['orden.nombre-producto']}
                        </th>
                        <th className="text-muted text-small w-30">
                          {messages['orden.almacen']}
                        </th>
                        <th className="text-right text-muted text-small w-10">
                          {messages['orden.cantidad-producto-solicitada']}
                        </th>
                        <th className="text-right text-muted text-small w-10">
                          {messages['orden.precio-venta']}
                        </th>
                        <th className="text-right text-muted text-small w-10">
                          {messages['orden.total-venta']}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading &&
                        productosOrdenVenta.map((producto) => (
                          <tr
                            key={`td_${producto.id}#${producto.idAlmacen}#${producto.id_tipo_venta}`}
                          >
                            <td className="valign-middle">
                              {producto.glosa}{' '}
                              {producto.id_tipo_venta === TIPOS_VENTA.DETALLE
                                ? '(Paquete)'
                                : '(Caja)'}
                            </td>
                            <td className="valign-middle">
                              {producto.glosa_almacen}
                            </td>
                            <td className="text-right valign-middle">
                              {producto.cantidad}
                            </td>
                            <td className="text-right valign-middle">
                              {priceFormat(producto.precio_venta)}
                            </td>
                            <td className="text-right valign-middle">
                              {priceFormat(
                                producto.precio_venta * producto.cantidad
                              )}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td className="text-right valign-middle" colSpan="4">
                          <strong>{messages['orden.total-venta']}</strong>
                        </td>
                        <td className="text-right valign-middle">
                          <strong>{priceFormat(orden.total_venta)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleOrdenVenta);
