import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import { injectIntl } from 'react-intl';

import IntlMessages from '../../helpers/IntlMessages';
import ModifyQuantityProductClient from './ModifyQuantityProductClient';
import Table from './Table';
import { priceFormat } from '../../helpers/Utils';
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal';
import BusquedaItems from '../applications/BusquedaItems';
import useProductosCliente from '../../hooks/clientes/use-productos-cliente';
import AsignaProductoCliente from './AsignaProductoCliente';
import AgregarNuevoProductoCliente from './AgregarNuevoProductoCliente';

const TablaProductosCliente = ({
  intl,
  idCliente,
  modalOpenPC,
  setModalOpenPC,
  modalOpenNPC,
  setModalOpenNPC,
}) => {
  const { messages } = intl;
  const [modalOpen, setModalOpen] = useState(false);

  const [producto, setProducto] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    productosCliente,
    isLoading,
    actualizaProducto,
    eliminaProducto,
    agregaProducto,
    creaAsignaProducto,
  } = useProductosCliente(idCliente);

  const [itemsBusqueda, setItemsBusqueda] = useState(null);

  useEffect(() => {
    if (!isLoading) setItemsBusqueda(productosCliente);
  }, [isLoading, productosCliente]);

  const accion = async (payload) => {
    switch (payload.action) {
      case 'add':
        await agregaProducto(payload);
        break;
      case 'update':
        await actualizaProducto(payload);
        break;
      case 'delete':
        await eliminaProducto(payload);
        break;
      case 'addCreate':
        await creaAsignaProducto({ idCliente, ...payload });
        break;

      default:
        break;
    }
  };

  const confEliminaProducto = (idProducto) => {
    const payload = {
      idProducto,
      idCliente,
      action: 'delete',
    };

    accion(payload);
    setDeleteModal(!deleteModal);
  };

  const cols = React.useMemo(() => {
    const edita = (props) => {
      const { id, precio_venta: precioVentaOriginal } = props.row.original;

      setProducto({ id, precioVentaOriginal });
      setModalOpen(!modalOpen);
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
        Header: messages['productos.descripcion'],
        accessor: 'descripcion',
        cellClass: 'text-muted w-15',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: messages['productos.precio-venta'],
        accessor: 'precio_venta',
        cellClass: 'text-muted w-15',
        Cell: ({ value }) => <>{priceFormat(value)}</>,
      },
      {
        Header: ``,
        accessor: 'edit',
        cellClass: 'w-5',
        Cell: (props) => (
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
        Cell: (props) => (
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
  }, [messages, modalOpen, deleteModal]);

  return isLoading && !itemsBusqueda ? (
    <div className="loading" />
  ) : (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="productos.productos-cliente" />
          <BusquedaItems
            items={productosCliente}
            setItemsBusqueda={setItemsBusqueda}
          />
        </CardTitle>

        <ModifyQuantityProductClient
          idCliente={idCliente}
          item={producto}
          accion={accion}
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AsignaProductoCliente
          idCliente={idCliente}
          accion={accion}
          modalOpen={modalOpenPC}
          toggleModal={(aap) => {
            setModalOpenPC(!modalOpenPC);
            if (aap) setModalOpenNPC(!modalOpenNPC);
          }}
        />
        <AgregarNuevoProductoCliente
          modalOpen={modalOpenNPC}
          toggleModal={() => setModalOpenNPC(!modalOpenNPC)}
          accion={accion}
        />

        <DeleteConfirmModal
          message={`¿Está seguro que desea eliminar el producto ${producto?.glosa}?`}
          accion={confEliminaProducto}
          item={producto}
          modalOpen={deleteModal}
          toggleModal={() => setDeleteModal(!deleteModal)}
        />
        {itemsBusqueda && <Table columns={cols} data={itemsBusqueda} />}
      </CardBody>
    </Card>
  );
};
export default injectIntl(TablaProductosCliente);
