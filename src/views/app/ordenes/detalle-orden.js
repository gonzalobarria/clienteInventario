import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Table,
  CustomInput,
} from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import ModificaProductoOrden from '../../../containers/pages/ModificaProductoOrden';
import { ESTADOS_ORDEN, URI } from '../../../constants/enums';
import ViewPhoto from '../../../containers/pages/ViewPhoto';
import AgregaNuevoProductoALaOrden from '../../../containers/pages/AgregaNuevoProductoALaOrden';
import DeleteConfirmModal from '../../../components/common/DeleteConfirmModal';
import { NotificationManager } from '../../../components/common/react-notifications';
import useProductosOrden from '../../../hooks/ordenes/use-productos-orden';
import { getImagen, numberFormat } from '../../../helpers/Utils';
import { API } from '../../../helpers/axios';
import ProductosPreOrden from '../../../containers/pages/ProductosPreOrden';
import useUnidadesMedida from '../../../hooks/unidades-medida/use-unidades-medida';
import useOrden from '../../../hooks/ordenes/use-orden';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';
import UploadPhotoV2 from '../../../containers/pages/UploadPhotoV2';

const DetalleOrden = ({ match, intl }) => {
  const { messages } = intl;
  const [activeTab, setActiveTab] = useState('details');
  const [modalPO, setModalPO] = useState(false);
  const [modalPPO, setModalPPO] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAPO, setModalAPO] = useState(false);
  const [idProducto, setIdProducto] = useState('');
  const [producto, setProducto] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [listadoSeleccionado, setListadoSeleccionado] = useState([]);
  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();
  const { ENVIADO, EN_PROCESO, PREORDEN_GENERADA, RECIBIDO } = ESTADOS_ORDEN;

  const {
    params: { idOrden },
  } = match;

  const { orden, isLoading, subirFoto, mutate: mutateOrden } = useOrden(
    idOrden
  );

  const {
    productosOrden,
    isLoading: isLoadingPO,
    mutate,
    subirFotoProducto,
  } = useProductosOrden(idOrden);

  const getUnidadMedida = (idUnidadMedida) => {
    if (!idUnidadMedida && isLoadingUM) return '';
    return unidadesMedida?.find((i) => i.id === parseInt(idUnidadMedida, 10))
      .glosa;
  };

  const accion = (item, action) => {
    async function fetchData() {
      if (action === 'delete' || action === 'update') {
        await API.patch(`${URI.ORDENES}/${idOrden}/productos`, item);
      }
      if (action === 'insert') {
        await API.post(`${URI.ORDENES}/${idOrden}/productos`, item);
      }
      if (action === 'cerrar') {
        await API.patch(`${URI.ORDENES}/${idOrden}/estado`, item);
        mutateOrden();
      }
      mutate();
    }

    fetchData();
  };

  const edita = (item) => {
    setProducto(item);
    setModalOpen(!modalOpen);
  };

  const handleCheckChange = (event, id) => {
    let selectedList = Object.assign([], listadoSeleccionado);
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setListadoSeleccionado(selectedList);
  };

  const eliminaProducto = (idItem) => {
    const payload = {
      idProducto: idItem,
      idOrden,
      action: 'delete',
    };
    accion(payload, 'delete');
    setDeleteModal(!deleteModal);
  };

  const elimina = (item) => {
    setProducto(item);
    setDeleteModal(!deleteModal);
  };

  const cerrarPedido = () => {
    const sinAsignar = productosOrden.filter(
      (p) => p.datos_adicionales?.cantidadRecibida === undefined
    );

    if (sinAsignar.length === 0) {
      const payload = {
        idOrden,
        action: 'cerrarPedido',
      };
      accion(payload, 'cerrar');
    } else {
      NotificationManager.error(
        messages['error.prod-sin-recibir'],
        messages['error.titulo-prod-sin-recibir'],
        5000,
        null,
        null,
        'filled'
      );
    }
  };

  const titulo =
    orden?.id_estado === PREORDEN_GENERADA
      ? 'menu.detalle-pre-orden'
      : 'menu.detalle-orden';

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <Breadcrumb heading={titulo} match={match} />
        {orden.id_estado === EN_PROCESO && (
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => setModalAPO(!modalAPO)}
            >
              <IntlMessages id="orden.agregar-producto" />
            </Button>
            <AgregaNuevoProductoALaOrden
              modalOpen={modalAPO}
              toggleModal={() => setModalAPO(!modalAPO)}
              idOrden={idOrden}
              accion={accion}
            />
          </div>
        )}
        {orden.id_estado === ENVIADO && (
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={cerrarPedido}
            >
              <IntlMessages id="orden.cerrar-pedido" />
            </Button>
          </div>
        )}
        <Nav tabs className="separator-tabs ml-0 mb-5">
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === 'details',
                'nav-link': true,
              })}
              onClick={() => setActiveTab('details')}
            >
              <IntlMessages id="pages.details" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === 'orders',
                'nav-link': true,
              })}
              onClick={() => setActiveTab('orders')}
            >
              <IntlMessages id="orden.factura" />
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row className="invoice-react">
              <Colxx xxs="12" className="mb-4">
                <Card className="mb-5">
                  <CardBody className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                        <div className="d-flex align-self-center">
                          <img
                            src="/assets/logos/black.svg"
                            alt="Logo"
                            width="200px;"
                          />
                        </div>
                        <div className="d-flex w-30 text-right align-self-center">
                          <p className="text-small text-semi-muted mb-0">
                            Antonia Lopez de Bello 743 Recoleta, Santiago
                          </p>
                        </div>
                      </div>
                      <div className="border-bottom pt-4 mb-5" />
                      {orden.destino && (
                        <div className="d-flex flex-row justify-content-between mb-5">
                          <div className="d-flex flex-column w-50 mr-2 p-4 text-semi-muted bg-semi-muted">
                            <p className="mb-0">
                              <IntlMessages id="orden.origen-pedido" />
                            </p>
                            <p className="mb-0">
                              {orden.glosa_bodega_origen === null
                                ? orden.glosa_proveedor_origen
                                : orden.glosa_bodega_origen}
                            </p>
                            <p className="mb-0">{orden.fecha_creacion}</p>
                          </div>
                          <div className="d-flex w-50 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                            <p className="mb-0">
                              <IntlMessages id="orden.destino-pedido" />
                            </p>
                            <p className="mb-0">{orden.destino}</p>
                            <p className="mb-0">
                              Enviar a:{' '}
                              {orden.datos_adicionales_almacen?.direccion}
                            </p>
                          </div>
                        </div>
                      )}
                      <ModificaProductoOrden
                        modalOpen={modalOpen}
                        toggleModal={() => setModalOpen(!modalOpen)}
                        idOrden={idOrden}
                        producto={producto}
                        orden={orden}
                        accion={accion}
                      />
                      <DeleteConfirmModal
                        message={`¿Está seguro que desea eliminar el producto ${producto?.glosa}?`}
                        accion={eliminaProducto}
                        item={producto}
                        modalOpen={deleteModal}
                        toggleModal={() => setDeleteModal(!deleteModal)}
                      />
                      <Table bordered>
                        <thead>
                          <tr>
                            <th className="text-muted text-small w-40">
                              <IntlMessages id="orden.nombre-producto" />
                            </th>
                            <th className="text-right text-muted text-small w-20">
                              <IntlMessages id="mantenedores.unidad-medida" />
                            </th>
                            <th className="text-right text-muted text-small w-20">
                              <IntlMessages id="orden.cantidad-producto-solicitada" />
                            </th>
                            {[ENVIADO, RECIBIDO].includes(orden.id_estado) && (
                              <th className="text-right text-muted text-small w-10">
                                <IntlMessages id="orden.cantidad-recibida" />
                              </th>
                            )}
                            {[EN_PROCESO].includes(orden.id_estado) && (
                              <>
                                <th className="text-right text-muted text-small w-10">
                                  <IntlMessages id="contextmenu.editar" />
                                </th>
                                <th className="text-right text-muted text-small w-10">
                                  <IntlMessages id="contextmenu.eliminar" />
                                </th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {!isLoadingPO &&
                            productosOrden.map((item) => (
                              <tr key={`td_${item.id}`}>
                                <td className="align-middle">
                                  {[PREORDEN_GENERADA].includes(
                                    orden.id_estado
                                  ) ? (
                                    <CustomInput
                                      type="checkbox"
                                      id={`check_${item.id}`}
                                      onChange={(event) =>
                                        handleCheckChange(event, item.id)
                                      }
                                      label={item.glosa}
                                    />
                                  ) : (
                                    item.glosa
                                  )}
                                </td>
                                <td className="text-right align-middle">
                                  {getUnidadMedida(item?.idUnidadMedida)}
                                </td>
                                <td className="text-right align-middle">
                                  {numberFormat(item.cantidad)}
                                </td>
                                {[ENVIADO, RECIBIDO].includes(
                                  orden.id_estado
                                ) && (
                                  <td className="text-right align-middle">
                                    {item.datos_adicionales?.cantidadRecibida}
                                  </td>
                                )}
                                {[EN_PROCESO].includes(orden.id_estado) && (
                                  <>
                                    <td className="text-right">
                                      <Button
                                        outline
                                        color="primary"
                                        className="icon-button"
                                        onClick={() => edita(item)}
                                      >
                                        <i className="simple-icon-pencil" />
                                      </Button>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        outline
                                        color="secondary"
                                        className="icon-button"
                                        onClick={() => elimina(item)}
                                      >
                                        <i className="simple-icon-trash" />
                                      </Button>
                                    </td>
                                  </>
                                )}
                                {orden.id_estado === ENVIADO && (
                                  <>
                                    <td className="text-right">
                                      <Button
                                        outline
                                        color="primary"
                                        className="icon-button"
                                        onClick={() => edita(item)}
                                      >
                                        <i className="simple-icon-pencil" />
                                      </Button>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        outline
                                        color="primary"
                                        className="icon-button"
                                        onClick={() => {
                                          setModalPO(!modalPO);
                                          setIdProducto(item.id);
                                        }}
                                      >
                                        <i className="simple-icon-picture" />
                                      </Button>
                                    </td>
                                    {modalPO && (
                                      <UploadPhotoV2
                                        modalPhoto={modalPO}
                                        toggleModal={() => setModalPO(!modalPO)}
                                        setAppend={(formData) => {
                                          formData.append(
                                            'folder',
                                            'productosOrden'
                                          );
                                          formData.append('idOrden', idOrden);
                                          formData.append(
                                            'idProducto',
                                            idProducto
                                          );
                                        }}
                                        subirFoto={subirFotoProducto}
                                      />
                                    )}
                                  </>
                                )}
                                {item.datos_adicionales?.imgURL && (
                                  <td className="text-right">
                                    <Button
                                      outline
                                      color="primary"
                                      className="icon-button"
                                      onClick={() => {
                                        setModalPPO(!modalPPO);
                                        setIdProducto(item.id);
                                      }}
                                    >
                                      <i className="simple-icon-eye" />
                                    </Button>
                                    <ViewPhoto
                                      modalBasic={modalPPO}
                                      toggleModal={() => setModalPPO(!modalPPO)}
                                      imgURL={item.datos_adicionales.imgURL}
                                    />
                                  </td>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
            <ProductosPreOrden
              productos={productosOrden}
              orden={orden}
              listadoSeleccionado={listadoSeleccionado}
            />
          </TabPane>
          <TabPane tabId="orders">
            <Row className="invoice-react">
              <Colxx xxs="12" className="mb-4">
                <Card className="mb-5">
                  <ImagenDetalle
                    src={getImagen(orden.datos_adicionales?.imgURL)}
                    folder="facturas"
                    id={idOrden}
                    idTitle="idOrden"
                    subirFoto={subirFoto}
                  />
                </Card>
              </Colxx>
            </Row>
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleOrden);
