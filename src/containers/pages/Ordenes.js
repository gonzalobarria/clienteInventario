/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import Pagination from './Pagination';

const OrderItem = ({ order }) => {
  const glosa =
    order.glosa_bodega_origen === null
      ? order.glosa_proveedor_origen
      : order.glosa_bodega_origen;

  const colorBadge = 'primary';
  let glosaBatch = 'Activo';

  if (order.glosa_estado !== undefined) {
    glosaBatch = order.glosa_estado;
  }

  return (
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <NavLink
            to={`/app/ordenes/${order.id}`}
            className="list-item-heading mb-1 truncate w-40 w-xs-100"
          >
            {glosa}
          </NavLink>
          <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {order.destino}
          </p>
          <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {order.fecha_creacion}
          </p>

          <div className="w-15 w-xs-100 text-right">
            <Badge color={colorBadge} pill>
              {glosaBatch.toUpperCase()}
            </Badge>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

const Ordenes = ({ orders, onChangePage }) => {
  return (
    <Row>
      <Colxx>
        {orders.data.map((order, index) => (
          <OrderItem key={`order_${index}`} order={order} />
        ))}
      </Colxx>

      <Pagination
        currentPage={orders.currentPage}
        totalPage={orders.totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default Ordenes;
