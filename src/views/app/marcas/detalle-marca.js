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
import { getOrdenesMarca } from '../../../redux/actions';
import ProductsBrandTable from '../../../containers/pages/ProductsBrandTable';
import { getImagen } from '../../../helpers/Utils';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import useMarca from '../../../hooks/marcas/use-marca';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';

const DetalleMarca = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize] = useState(8);

  const dispatch = useDispatch();
  const {
    params: { idMarca },
  } = match;

  const { marca, isLoading, subirFoto } = useMarca(idMarca);

  const { ordenesMarca, loadingOM, errorOM } = useSelector(
    ({ ordenesApp }) => ({
      ordenesMarca: ordenesApp.ordenesMarca,
      loadingOM: ordenesApp.loadingOM,
      errorOM: ordenesApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      getOrdenesMarca({
        currentPage,
        selectedPageSize,
        idMarca,
      })
    );
  }, [dispatch, idMarca, currentPage, selectedPageSize]);

  if (errorOM) return <Redirect to="/unauthorized" />;

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>{marca.glosa}</h1>
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
                    src={getImagen(marca.datos_adicionales?.imgURL)}
                    folder="fotosMarcas"
                    id={idMarca}
                    idTitle="idMarca"
                    subirFoto={subirFoto}
                  />
                  <CardBody>
                    <DetalleAtributo
                      titulo="pages.description"
                      item={marca.descripcion}
                    />
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                <ProductsBrandTable idMarca={idMarca} match={match} />
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="orders">
            {loadingOM && (
              <Ordenes orders={ordenesMarca} onChangePage={setCurrentPage} />
            )}
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleMarca);
