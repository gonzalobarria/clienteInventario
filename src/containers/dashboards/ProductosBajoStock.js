import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import Table from '../pages/Table';
import useProductosBajoStock from '../../hooks/productos/use-productos-bajo-stock';

const ProductosBajoStock = ({ intl, local }) => {
  const { messages } = intl;

  const { productosBajoStock, isLoading } = useProductosBajoStock(local);

  const cols = React.useMemo(
    () => [
      {
        Header: messages['opciones.nombre-producto'],
        accessor: 'glosa_producto',
        cellClass: 'text-muted w-40 align-middle',
        Cell: ({ value }) => <>{value}</>,
        sortType: 'basic',
      },
      {
        Header: local
          ? messages['opciones.nombre-local']
          : messages['opciones.nombre-bodega'],
        accessor: 'glosa_almacen',
        cellClass: 'text-muted w-40 align-middle',
        Cell: ({ value }) => <>{value}</>,
        sortType: 'basic',
      },
      {
        Header: local
          ? messages['productos.stock-local']
          : messages['productos.stock-bodega'],
        accessor: 'stock_disponible',
        cellClass: 'w-20 text-center text-white',
        Cell: ({ value }) => (
          <div
            className={`p-2 rounded ${value < 20 ? 'bg-danger' : 'bg-warning'}`}
          >
            {value}
          </div>
        ),
        sortType: 'basic',
      },
    ],
    [messages, local]
  );

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          {local ? (
            <IntlMessages id="dashboards.bajo-stock-local" />
          ) : (
            <IntlMessages id="dashboards.bajo-stock-bodega" />
          )}
        </CardTitle>
        {!isLoading && <Table columns={cols} data={productosBajoStock} />}
      </CardBody>
    </Card>
  );
};

export default injectIntl(ProductosBajoStock);
