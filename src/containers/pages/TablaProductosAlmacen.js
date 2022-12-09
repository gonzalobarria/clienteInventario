import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { injectIntl } from 'react-intl';
import ModificaStockProductoAlmacen from './ModificaStockProductoAlmacen';
import IntlMessages from '../../helpers/IntlMessages';
import Table from './Table';
import { numberFormat } from '../../helpers/Utils';
import AgregaProductoAlAlmacen from './AgregaProductoAlAlmacen';
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal';
import useProductosAlmacen from '../../hooks/almacenes/use-productos-almacen';
import BusquedaItems from '../applications/BusquedaItems';

const TablaProductosAlmacen = ({
  functionalities,
  intl,
  idAlmacen,
  modalOpen,
  toggleModal,
}) => {
  const { messages } = intl;
  const [producto, setProducto] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemsBusqueda, setItemsBusqueda] = useState(null);
  const [edittingId, setEdittingId] = useState('');
  const [editStockDisponible, setEditStockDisponible] = useState('');
  const [modalOpenStock, setModalOpenStock] = useState(false);

  const esBodega = window.location.pathname.indexOf('bodegas') !== -1;

  const {
    productosAlmacen,
    isLoading: isLoadingPA,
    agregaProducto,
    actualizaProducto,
    eliminaProducto,
  } = useProductosAlmacen(idAlmacen);

  useEffect(() => {
    if (!isLoadingPA) setItemsBusqueda(productosAlmacen);
  }, [isLoadingPA, productosAlmacen]);

  const accion = (item, action) => {
    async function fetchData() {
      if (action === 'insert') await agregaProducto(item);
      if (action === 'update') {
        await actualizaProducto(item);
        setItemsBusqueda(productosAlmacen);
      }
      if (action === 'delete') await eliminaProducto(item);
    }

    fetchData();
  };

  const eliminaProductoConf = (idProducto) => {
    const payload = {
      idProducto,
      idAlmacen,
      action: 'delete',
    };

    accion(payload, 'delete');
    setDeleteModal(!deleteModal);
  };

  const cols = React.useMemo(() => {
    const edita = (props) => {
      setModalOpenStock(!modalOpenStock);
      setEdittingId(props.row.original.id);
      setEditStockDisponible(props.row.original.stock_disponible);
    };

    const elimina = (props) => {
      const { id, glosa } = props.row.original;

      setProducto({ id, glosa });
      setDeleteModal(!deleteModal);
    };

    return [
      {
        Header: messages['productos.nombre'],
        accessor: 'glosa',
        cellClass: 'list-item-heading w-70',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: esBodega
          ? messages['productos.stock-bodega']
          : messages['productos.stock-local'],
        accessor: 'stock_disponible',
        cellClass: 'text-muted w-30',
        Cell: ({ value }) => <>{numberFormat(value)}</>,
      },
      {
        Header: ``,
        accessor: 'edit',
        cellClass: 'w-5',
        Cell: (props) =>
          functionalities.canEditPA && (
            <Button
              outline
              color="primary"
              className="icon-button"
              onClick={() => edita(props)}
            >
              <i className="simple-icon-pencil" />
            </Button>
          ),
      },
      {
        Header: ``,
        accessor: 'delete',
        cellClass: 'w-5',
        Cell: (props) =>
          functionalities.canDeletePA && (
            <Button
              outline
              color="secondary"
              className="icon-button"
              onClick={() => elimina(props)}
            >
              <i className="simple-icon-trash" />
            </Button>
          ),
      },
    ];
  }, [
    esBodega,
    messages,
    modalOpenStock,
    functionalities.canDeletePA,
    functionalities.canEditPA,
    deleteModal,
  ]);

  return isLoadingPA && !itemsBusqueda ? (
    <div className="loading" />
  ) : (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            {esBodega ? (
              <IntlMessages id="productos.productos-en-bodega" />
            ) : (
              <IntlMessages id="productos.productos-en-local" />
            )}
            <BusquedaItems
              items={productosAlmacen}
              setItemsBusqueda={setItemsBusqueda}
            />
          </CardTitle>
          <ModificaStockProductoAlmacen
            modalOpen={modalOpenStock}
            toggleModal={() => setModalOpenStock(!modalOpenStock)}
            idProducto={edittingId}
            idAlmacen={idAlmacen}
            stockDisponibleOriginal={editStockDisponible}
            accion={accion}
          />
          <DeleteConfirmModal
            message={`¿Está seguro que desea eliminar el producto ${producto?.glosa}?`}
            accion={eliminaProductoConf}
            item={producto}
            modalOpen={deleteModal}
            toggleModal={() => setDeleteModal(!deleteModal)}
          />
          {itemsBusqueda && <Table columns={cols} data={itemsBusqueda} />}
        </CardBody>
      </Card>
      <AgregaProductoAlAlmacen
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        idAlmacen={idAlmacen}
        accion={accion}
      />
    </>
  );
};
export default injectIntl(TablaProductosAlmacen);
