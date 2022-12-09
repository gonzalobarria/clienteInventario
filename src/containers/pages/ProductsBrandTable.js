/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { injectIntl } from 'react-intl';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import IntlMessages from '../../helpers/IntlMessages';
import { getProductosMarca } from '../../redux/actions';
import Table from './Table';
import BusquedaItems from '../applications/BusquedaItems';

const ProductsBrandTable = ({ intl, idMarca }) => {
  const { messages } = intl;

  const dispatch = useDispatch();

  const { productosMarca, loadingPM } = useSelector(
    ({ productosApp }) => ({
      productosMarca: productosApp.productosMarca,
      loadingPM: productosApp.loadingPM,
    }),
    shallowEqual
  );

  const [itemsBusqueda, setItemsBusqueda] = useState(null);

  useEffect(() => {
    if (loadingPM && !itemsBusqueda) setItemsBusqueda(productosMarca);
  }, [loadingPM, itemsBusqueda, productosMarca]);

  useEffect(() => {
    dispatch(getProductosMarca({ idMarca }));
  }, [dispatch, idMarca]);

  const cols = React.useMemo(
    () => [
      {
        Header: `${messages['productos.nombre']}`,
        accessor: 'glosa',
        cellClass: 'list-item-heading w-50',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: `${messages['productos.descripcion']}`,
        accessor: 'descripcion',
        cellClass: 'text-muted w-50',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    [messages]
  );
  return !loadingPM ? (
    <div className="loading" />
  ) : (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="productos.productos-marca" />
          <BusquedaItems
            items={productosMarca}
            setItemsBusqueda={setItemsBusqueda}
          />
        </CardTitle>
        {itemsBusqueda && <Table columns={cols} data={itemsBusqueda} />}
      </CardBody>
    </Card>
  );
};
export default injectIntl(ProductsBrandTable);
