import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import Ordenes from '../../../containers/pages/Ordenes';
import TablaAlmacenesProducto from '../../../containers/pages/TablaAlmacenesProducto';
import { getImagen } from '../../../helpers/Utils';
import { defCurrentPage, defPageSize } from '../../../constants/defaultValues';
import useProducto from '../../../hooks/productos/use-producto';
import useOrdenesProducto from '../../../hooks/productos/use-ordenes-producto';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';
import productoService from '../../../services/productoService';

const DetalleProducto = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(defCurrentPage);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadOP, setLoadOP] = useState(false);
  const {
    params: { idProducto },
  } = match;

  const { producto, isLoading: isLoadingP, mutate } = useProducto(idProducto);

  const { ordenesProducto, isLoading: isLoadingOP } = useOrdenesProducto({
    currentPage,
    pageSize: defPageSize,
    idProducto,
    loadOP,
  });

  const subirFoto = async (item) => {
    await productoService.subirFoto(item);
    mutate();
  };

  useEffect(() => {
    if (activeTab === 'orders' && !loadOP) setLoadOP(true);
  }, [activeTab, loadOP]);

  const toggleModal = () => setModalOpen(!modalOpen);

  return isLoadingP ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>{producto.glosa}</h1>
        <div className="text-zero top-right-button-container">
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              color="primary"
              size="lg"
              outline
              className="top-right-button top-right-button-single"
            >
              <IntlMessages id="pages.actions" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleModal}>
                <IntlMessages id="almacenes.agrega-producto-bodega-local" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <Breadcrumb match={match} />

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
              <IntlMessages id="pages.orders" />
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <ImagenDetalle
                    src={getImagen(producto.datos_adicionales?.imgURL)}
                    folder="fotosProductos"
                    id={idProducto}
                    idTitle="idProducto"
                    subirFoto={subirFoto}
                  />
                  <CardBody>
                    <DetalleAtributo
                      titulo="pages.description"
                      item={producto.descripcion}
                    />
                    <DetalleAtributo
                      titulo="productos.sku"
                      item={producto.sku}
                    />
                    <DetalleAtributo
                      titulo="productos.precio-detalle"
                      item={producto.precio_detalle}
                      precio
                    />
                    <DetalleAtributo
                      titulo="productos.unidades-por-venta"
                      item={producto.unidades_venta}
                      numero
                    />
                    <DetalleAtributo
                      titulo="productos.precio-por-mayor"
                      item={producto.precio_mayor}
                      precio
                    />
                    <DetalleAtributo
                      titulo="productos.precio-por-embalaje"
                      item={producto.precio_embalaje}
                      precio
                    />
                    <DetalleAtributo
                      titulo="productos.unidades-por-embalaje"
                      item={producto.unidades_embalaje}
                      numero
                    />
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                <TablaAlmacenesProducto
                  idProducto={idProducto}
                  match={match}
                  modalOpen={modalOpen}
                  toggleModal={toggleModal}
                />
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="orders">
            {!isLoadingOP && (
              <Ordenes orders={ordenesProducto} onChangePage={setCurrentPage} />
            )}
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleProducto);
