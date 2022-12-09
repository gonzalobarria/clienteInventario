import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  TabContent,
  TabPane,
} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import Ordenes from '../../../containers/pages/Ordenes';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import { getOrdenesProveedor } from '../../../redux/actions';
import { getImagen } from '../../../helpers/Utils';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';
import useProveedor from '../../../hooks/proveedores/use-proveedor';

const DetalleProveedor = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize] = useState(8);

  const dispatch = useDispatch();
  const {
    params: { idProveedor },
  } = match;

  const { proveedor, isLoading, subirFoto } = useProveedor(idProveedor);

  const { ordenesProveedor, loadingOPr, errorOPr } = useSelector(
    ({ ordenesApp }) => ({
      ordenesProveedor: ordenesApp.ordenesProveedor,
      loadingOPr: ordenesApp.loadingOPr,
      errorOPr: ordenesApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      getOrdenesProveedor({
        currentPage,
        selectedPageSize,
        idProveedor,
      })
    );
  }, [dispatch, idProveedor, currentPage, selectedPageSize]);

  if (errorOPr) return <Redirect to="/unauthorized" />;

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>{proveedor.glosa}</h1>
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
              <></>
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
                    src={getImagen(proveedor.datos_adicionales?.imgURL)}
                    folder="fotosProveedores"
                    id={idProveedor}
                    idTitle="idProveedor"
                    subirFoto={subirFoto}
                  />
                  <CardBody>
                    <DetalleAtributo
                      titulo="pages.description"
                      item={proveedor.descripcion}
                    />
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                <></>
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="orders">
            {loadingOPr && (
              <Ordenes
                orders={ordenesProveedor}
                onChangePage={setCurrentPage}
              />
            )}
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleProveedor);
