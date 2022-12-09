import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import IntlMessages from '../../../helpers/IntlMessages';
import { checkFuncionalidades } from '../../../helpers/Utils';
import { Funcionalidades } from '../../../helpers/authHelper';
import AgrupadorVistasOrdenes from '../../../containers/pages/AgrupadorVistasOrdenes';
import { Colxx } from '../../../components/common/CustomBootstrap';
import ProductsOrderWizard from '../../../containers/pages/ProductsOrderWizard';
import AssignOrderUser from '../../../containers/pages/AssignOrderUser';
import { ESTADOS_ORDEN } from '../../../constants/enums';
import { orderOptionsPages, pageSizes } from '../../../constants/defaultValues';
import PreOrder from '../../../containers/pages/PreOrder';
import useOrdenes from '../../../hooks/ordenes/use-ordenes';
import usePaginador from '../../../hooks/use-paginador';

const ListadoOrdenes = ({ match }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('orderList');
  const [idOrden, setIdOrden] = useState(null);

  const orderOptions = orderOptionsPages.orden;
  const { pag } = usePaginador(orderOptions);
  const { ordenes, isLoading, accion, crea } = useOrdenes(pag);

  useEffect(() => {
    setActiveTab('orderList');
  }, [ordenes]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);
    setIdOrden(idItem);
  };

  const toggleModal = () => editItem(null);

  const getFunctionalities = (id) => {
    const { id_estado: idEstadoOrden } = ordenes.data.find((o) => o.id === id);
    const { EN_PROCESO, ENVIADO, RECIBIDO } = ESTADOS_ORDEN;
    const isAuth = checkFuncionalidades([Funcionalidades.Actualizar_Orden]);

    if (!isAuth) return {};

    return {
      canAssignUser: [EN_PROCESO].includes(idEstadoOrden),
      canEdit: [EN_PROCESO, ENVIADO].includes(idEstadoOrden),
      canPrintPDF: [ENVIADO, RECIBIDO].includes(idEstadoOrden),
    };
  };

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row>
      <Colxx xxs="12">
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.listado-ordenes"
            displayMode={pag.displayMode}
            changeDisplayMode={pag.setDisplayMode}
            changeOrderBy={pag.setOrder}
            changePageSize={pag.setPageSize}
            selectedPageSize={pag.pageSize}
            totalItemCount={ordenes.totalItem}
            selectedOrderOption={pag.orderBy}
            match={match}
            startIndex={pag.startIndex}
            endIndex={pag.endIndex}
            onSearchKey={(e) => {
              if (e.key === 'Enter') {
                pag.setSearch(e.target.value.toLowerCase());
              }
            }}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={() => setActiveTab('newOrderWizard')}
          />
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'orderList',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('orderList')}
              >
                <IntlMessages id="pages.details" />
              </NavLink>
            </NavItem>
            {checkFuncionalidades([Funcionalidades.Crear_Orden]) && (
              <NavItem>
                <NavLink
                  location={{}}
                  to="#"
                  className={classnames({
                    active: activeTab === 'newOrderWizard',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveTab('newOrderWizard')}
                >
                  <IntlMessages id="pages.orders" />
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'preOrder',
                  'nav-link': true,
                  'text-uppercase': true,
                })}
                onClick={() => setActiveTab('preOrder')}
              >
                <IntlMessages id="pages.pre-order" />
              </NavLink>
            </NavItem>
          </Nav>
          <AssignOrderUser
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            idOrden={idOrden}
            accion={accion}
          />
          <TabContent activeTab={activeTab}>
            <TabPane tabId="orderList">
              <AgrupadorVistasOrdenes
                items={ordenes.data}
                displayMode={pag.displayMode}
                currentPage={pag.currentPage}
                totalPage={ordenes.totalPage}
                getFunctionalities={getFunctionalities}
                onChangePage={pag.setCurrentPage}
                editItem={editItem}
              />
            </TabPane>
            <TabPane tabId="newOrderWizard">
              <ProductsOrderWizard match={match} creaOrden={crea} />
            </TabPane>
            <TabPane tabId="preOrder">
              <PreOrder match={match} activeTab={activeTab} creaOrden={crea} />
            </TabPane>
          </TabContent>
        </div>
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListadoOrdenes);
