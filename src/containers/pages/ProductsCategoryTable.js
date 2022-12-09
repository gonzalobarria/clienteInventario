import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { injectIntl } from 'react-intl';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import IntlMessages from '../../helpers/IntlMessages';
import { getProductosCategoria } from '../../redux/actions';
import Table from './Table';
import BusquedaItems from '../applications/BusquedaItems';

const ProductsCategoryTable = ({ intl, idCategoria }) => {
  const { messages } = intl;

  const dispatch = useDispatch();

  const { productosCategoria, loadingPCAT } = useSelector(
    ({ productosApp }) => ({
      productosCategoria: productosApp.productosCategoria,
      loadingPCAT: productosApp.loadingPCAT,
    }),
    shallowEqual
  );

  const [itemsBusqueda, setItemsBusqueda] = useState(null);

  useEffect(() => {
    if (loadingPCAT && !itemsBusqueda) setItemsBusqueda(productosCategoria);
  }, [loadingPCAT, itemsBusqueda, productosCategoria]);

  useEffect(() => {
    dispatch(getProductosCategoria({ idCategoria }));
  }, [dispatch, idCategoria]);

  const cols = React.useMemo(
    () => [
      {
        Header: messages['productos.nombre'],
        accessor: 'glosa',
        cellClass: 'list-item-heading w-50',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: messages['productos.descripcion'],
        accessor: 'descripcion',
        cellClass: 'text-muted w-20',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: messages['productos.categoria'],
        accessor: 'glosa_categoria',
        cellClass: 'text-muted w-30',
        Cell: ({ value }) => <>{value}</>,
      },
    ],
    [messages]
  );
  return !loadingPCAT ? (
    <div className="loading" />
  ) : (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="productos.productos-categoria" />
          <BusquedaItems
            items={productosCategoria}
            setItemsBusqueda={setItemsBusqueda}
          />
        </CardTitle>
        {itemsBusqueda && <Table columns={cols} data={itemsBusqueda} />}
      </CardBody>
    </Card>
  );
};
export default injectIntl(ProductsCategoryTable);
