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
import { NavLink, Redirect } from 'react-router-dom';
import classnames from 'classnames';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import Ordenes from '../../../containers/pages/Ordenes';
import { getOrdenesAlmacen } from '../../../redux/actions';
import TablaProductosAlmacen from '../../../containers/pages/TablaProductosAlmacen';
import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades, getImagen } from '../../../helpers/Utils';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import useAlmacen from '../../../hooks/almacenes/use-almacen';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';

const DetalleAlmacen = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [functionalities, setFunctionalities] = useState({});

  const dispatch = useDispatch();
  const {
    params: { idAlmacen },
  } = match;

  const { almacen, isLoading, subirFoto } = useAlmacen(idAlmacen);

  useEffect(() => {
    setFunctionalities({
      canAddPA: checkFuncionalidades([
        Funcionalidades.Agregar_Producto_al_Almacén,
      ]),
      canEditPA: checkFuncionalidades([
        Funcionalidades.Actualizar_Producto_del_Almacén,
      ]),
      canEditAlmacen: checkFuncionalidades([
        Funcionalidades.Actualizar_Almacen,
      ]),
      canDeletePA: checkFuncionalidades([
        Funcionalidades.Eliminar_Producto_del_Almacén,
      ]),
      canViewOrders: checkFuncionalidades([Funcionalidades.Ver_Orden]),
    });
  }, []);

  const { ordenesAlmacen, loadingOA, errorOA } = useSelector(
    ({ ordenesApp }) => ({
      ordenesAlmacen: ordenesApp.ordenesAlmacen,
      loadingOA: ordenesApp.loadingOA,
      errorOA: ordenesApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (activeTab === 'orders' && !ordenesAlmacen) {
      dispatch(
        getOrdenesAlmacen({
          currentPage,
          selectedPageSize,
          idAlmacen,
        })
      );
    }
  }, [
    dispatch,
    idAlmacen,
    currentPage,
    selectedPageSize,
    activeTab,
    ordenesAlmacen,
  ]);

  if (errorOA) return <Redirect to="/unauthorized" />;

  const toggleModal = () => setModalOpen(!modalOpen);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>{almacen.glosa}</h1>
        {functionalities.canAddPA && (
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
                <DropdownItem onClick={() => setModalOpen(!modalOpen)}>
                  <IntlMessages id="almacenes.agrega-producto-bodega" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}

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
          {functionalities.canViewOrders && (
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
          )}
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <ImagenDetalle
                    src={getImagen(almacen.datos_adicionales?.imgURL)}
                    folder="fotosAlmacen"
                    id={idAlmacen}
                    idTitle="idAlmacen"
                    subirFoto={subirFoto}
                  />
                  <CardBody>
                    <DetalleAtributo
                      titulo="pages.description"
                      item={almacen.descripcion}
                    />
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                {checkFuncionalidades([
                  Funcionalidades.Ver_Producto_del_Almacén,
                ]) && (
                  <TablaProductosAlmacen
                    functionalities={functionalities}
                    idAlmacen={idAlmacen}
                    match={match}
                    modalOpen={modalOpen}
                    toggleModal={toggleModal}
                  />
                )}
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="orders">
            {loadingOA && (
              <Ordenes orders={ordenesAlmacen} onChangePage={setCurrentPage} />
            )}
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default DetalleAlmacen;
