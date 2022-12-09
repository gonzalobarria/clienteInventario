/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import DeleteConfirmModal from '../../components/common/DeleteConfirmModal';
import IntlMessages from '../../helpers/IntlMessages';
import Table from './Table';
import ModifyQuantityProductOrder from './ModifyQuantityProductOrder';
import { numberFormat } from '../../helpers/Utils';
import useUnidadesMedida from '../../hooks/unidades-medida/use-unidades-medida';
import SeleccionaProveedor from './SeleccionaProveedor';
import ordenService from '../../services/ordenService';

const ProductosPreOrden = ({
  intl,
  productos,
  glosaOrigen,
  glosaDestino,
  removeProductoOrden,
  orden,
  listadoSeleccionado,
}) => {
  const { messages } = intl;

  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenProv, setModalOpenProv] = useState(false);
  const [edittingId, setEdittingId] = useState('');
  const [producto, setProducto] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [productosOrden, setProductosOrden] = useState(null);
  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();

  const editProductoOrden = (
    cantidad,
    idProducto,
    productosOrden,
    idUnidadMedida,
    tipoCompra
  ) => {
    setProductosOrden(
      productosOrden.map((prod) => {
        const item = prod;
        if (item.id === idProducto) {
          item.cantidad = cantidad;
          item.idUnidadMedida = idUnidadMedida;
          item.tipoCompra = tipoCompra;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (listadoSeleccionado.length === 0) setProductosOrden(null);
    else
      setProductosOrden(
        productos.filter((producto) =>
          listadoSeleccionado?.find((i) => i === producto.id)
        )
      );
  }, [listadoSeleccionado, productos]);

  const saveOrder = () => setModalOpenProv(!modalOpenProv);

  const asignaProveedor = async ({ idProveedor, productos }) => {
    const res = productos.map((item) => ({
      idProveedor,
      origen: 1,
      idAlmacenDestino: orden.id_destino,
      idProducto: item.id,
      ...item,
    }));
    await ordenService.crea({ productos: res });
    history.push('/app/ordenes');
  };

  const setNewCantidad = ({ cantidad, idUnidadMedida, tipoCompra }) => {
    editProductoOrden(
      cantidad,
      edittingId,
      productosOrden,
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
      setEdittingId(props.row.original.id);
      const prod = props.row.original;
      prod.stockDisponible = 5000;
      setProducto(prod);
    };

    const getUnidadMedida = (idUnidadMedida) => {
      if (!idUnidadMedida && isLoadingUM) return '';
      return unidadesMedida.find((i) => i.id === parseInt(idUnidadMedida, 10))
        .glosa;
    };

    const elimina = (props) => {
      const { idProducto: id, glosaProducto: glosa } = props.row.original;

      setProducto({ id, glosa, data: props.data });
      setDeleteModal(!deleteModal);
    };

    return [
      {
        Header: messages['productos.nombre'],
        accessor: 'glosa',
        cellClass: 'list-item-heading w-70',
        Cell: ({ value }) => value,
      },
      {
        Header: messages['mantenedores.unidad-medida'],
        accessor: 'idUnidadMedida',
        cellClass: 'text-muted w-20',
        Cell: ({ value }) => getUnidadMedida(value),
      },
      {
        Header: messages['productos.cantidad'],
        accessor: 'cantidad',
        cellClass: 'text-muted w-20',
        Cell: ({ value }) => numberFormat(value),
      },
      {
        Header: ``,
        accessor: 'id',
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
  }, [messages, modalOpen, deleteModal, unidadesMedida, isLoadingUM]);

  return (
    productosOrden?.length > 0 && (
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
          <Table
            columns={cols}
            data={productosOrden}
            defaultPageSize={1000}
            paginator={false}
          />
          <ModifyQuantityProductOrder
            modalOpen={modalOpen}
            toggleModal={() => setModalOpen(!modalOpen)}
            setNewCantidad={setNewCantidad}
            producto={producto}
          />
          <SeleccionaProveedor
            modalOpen={modalOpenProv}
            toggleModal={() => setModalOpenProv(!modalOpenProv)}
            productos={productosOrden}
            accion={asignaProveedor}
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
            <IntlMessages id="orden.crear-orden" />
          </Button>
        </CardBody>
      </Card>
    )
  );
};

export default injectIntl(ProductosPreOrden);
