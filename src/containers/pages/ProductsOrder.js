/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { injectIntl } from 'react-intl';

import DeleteConfirmModal from '../../components/common/DeleteConfirmModal';
import IntlMessages from '../../helpers/IntlMessages';
import Table from './Table';
import ModifyQuantityProductOrder from './ModifyQuantityProductOrder';
import { numberFormat } from '../../helpers/Utils';
import SeleccionaAlmacen from './SeleccionaAlmacen';

const ProductsOrder = ({
  intl,
  productos,
  glosaOrigen,
  glosaDestino,
  removeProductoOrden,
  editProductoOrden,
  preOrder,
  creaOrden,
}) => {
  const { messages } = intl;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPO, setModalOpenPO] = useState(false);
  const [edittingId, setEdittingId] = useState('');
  const [producto, setProducto] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);

  const saveOrder = (productos) => {
    if (preOrder) setModalOpenPO(!modalOpenPO);
    else creaOrden({ productos, preOrder });
  };

  const asignaAlmacenDestino = ({
    idAlmacen: idAlmacenDestino,
    idTipoAlmacen: idTipoAlmacenDestino,
    productos,
  }) => {
    if (preOrder) {
      const res = productos.map((item) => ({
        idAlmacenDestino,
        idTipoAlmacenDestino,
        ...item,
      }));
      creaOrden({ productos: res, preOrder });
    }
  };

  const setNewCantidad = ({ cantidad, idUnidadMedida, tipoCompra }) => {
    editProductoOrden(
      cantidad,
      edittingId,
      productos,
      idUnidadMedida,
      tipoCompra
    );
  };

  const eliminaProducto = (idProducto) => {
    removeProductoOrden(idProducto, producto.data);
    setDeleteModal(!deleteModal);
  };

  const cols = React.useMemo(() => {
    const edita = (props) => {
      setModalOpen(!modalOpen);
      setEdittingId(props.row.original.idProducto);
      setProducto(props.row.original);
    };

    const elimina = (props) => {
      const { idProducto: id, glosaProducto: glosa } = props.row.original;

      setProducto({ id, glosa, data: props.data });
      setDeleteModal(!deleteModal);
    };

    return [
      {
        Header: `${messages['productos.nombre']}`,
        accessor: 'glosaProducto',
        cellClass: 'list-item-heading w-70',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: `${messages['mantenedores.unidad-medida']}`,
        accessor: 'tipoCompra',
        cellClass: 'text-muted w-20',
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: `${messages['productos.cantidad']}`,
        accessor: 'cantidad',
        cellClass: 'text-muted w-20',
        Cell: ({ value }) => <>{numberFormat(value)}</>,
      },
      {
        Header: ``,
        accessor: 'id',
        cellClass: 'w-5',
        Cell: (props) => (
          <>
            <Button
              outline
              color="primary"
              className="icon-button"
              onClick={() => edita(props)}
            >
              <i className="simple-icon-pencil" />
            </Button>
          </>
        ),
      },
      {
        Header: ``,
        accessor: 'delete',
        cellClass: 'w-5',
        Cell: (props) => (
          <>
            <Button
              outline
              color="secondary"
              className="icon-button"
              onClick={() => elimina(props)}
            >
              <i className="simple-icon-trash" />
            </Button>
          </>
        ),
      },
    ];
  }, [messages, modalOpen, deleteModal]);

  return (
    productos?.length > 0 && (
      <Card className="mb-4">
        <CardBody>
          <div className="d-flex flex-row justify-content-between pt-2 pb-2">
            <div className="d-flex align-self-center">
              <img src="/assets/logos/black.svg" alt="Logo" width="200px;" />
            </div>
            <div className="d-flex w-30 text-right align-self-center">
              <p className="text-small text-semi-muted mb-0">
                Antonia Lopez de Bello 743 Recoleta, Santiago
              </p>
            </div>
          </div>
          <div className="border-bottom pt-4 mb-5" />
          {!preOrder && (
            <div className="d-flex flex-row justify-content-between mb-5">
              <div className="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                <p className="mb-0">Origen</p>
                <p className="mb-0">{glosaOrigen}</p>
              </div>
              <div className="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                <p className="mb-0">Destino</p>
                <p className="mb-0">{glosaDestino}</p>
              </div>
            </div>
          )}
          <Table
            columns={cols}
            data={productos}
            defaultPageSize={1000}
            paginator={false}
          />
          <ModifyQuantityProductOrder
            modalOpen={modalOpen}
            toggleModal={() => setModalOpen(!modalOpen)}
            setNewCantidad={setNewCantidad}
            producto={producto}
          />
          <SeleccionaAlmacen
            modalOpen={modalOpenPO}
            toggleModal={() => setModalOpenPO(!modalOpenPO)}
            productos={productos}
            accion={asignaAlmacenDestino}
          />
          <DeleteConfirmModal
            message={`¿Está seguro que desea eliminar el producto ${producto?.glosa}?`}
            accion={eliminaProducto}
            item={producto}
            modalOpen={deleteModal}
            toggleModal={() => setDeleteModal(!deleteModal)}
          />
          <Button
            color="primary"
            type="button"
            onClick={() => saveOrder(productos)}
          >
            {preOrder ? (
              <IntlMessages id="orden.crear-pre-orden" />
            ) : (
              <IntlMessages id="orden.crear-orden" />
            )}
          </Button>
        </CardBody>
      </Card>
    )
  );
};

export default injectIntl(ProductsOrder);
