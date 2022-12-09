import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { injectIntl } from 'react-intl';

import IntlMessages from '../../helpers/IntlMessages';
import Table from './Table';
import { numberFormat } from '../../helpers/Utils';
import useAlmacenesProducto from '../../hooks/productos/use-almacenes-producto';
import AsignaAlmacenAlProducto from './AsignaAlmacenAlProducto';
import BusquedaItems from '../applications/BusquedaItems';

const TablaAlmacenesProducto = ({
  intl,
  idProducto,
  modalOpen,
  toggleModal,
}) => {
  const { messages } = intl;

  const {
    almacenesProducto,
    isLoading: isLoadingAP,
    agregaAlmacen,
  } = useAlmacenesProducto(idProducto);

  const [itemsBusqueda, setItemsBusqueda] = useState(null);

  useEffect(() => {
    if (!isLoadingAP) setItemsBusqueda(almacenesProducto);
  }, [isLoadingAP, almacenesProducto]);

  const accion = (payload) => {
    async function fetchData() {
      await agregaAlmacen(payload);
    }

    fetchData();
  };

  const cols = React.useMemo(
    () => [
      {
        Header: messages['productos.nombre'],
        accessor: 'glosa',
        cellClass: 'list-item-heading w-50',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: messages['almacenes.stock-actual'],
        accessor: 'stock_disponible',
        cellClass: 'text-muted w-50',
        Cell: ({ value }) => <>{numberFormat(value)}</>,
      },
    ],
    [messages]
  );

  return isLoadingAP && !itemsBusqueda ? (
    <div className="loading" />
  ) : (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="almacenes.almacenes-producto" />
            <BusquedaItems
              items={almacenesProducto}
              setItemsBusqueda={setItemsBusqueda}
            />
          </CardTitle>
          {itemsBusqueda && <Table columns={cols} data={itemsBusqueda} />}
        </CardBody>
      </Card>
      <AsignaAlmacenAlProducto
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        idProducto={idProducto}
        accion={accion}
      />
    </>
  );
};
export default injectIntl(TablaAlmacenesProducto);
