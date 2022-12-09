import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import TablaProductosCliente from '../../../containers/pages/TablaProductosCliente';
import { getImagen } from '../../../helpers/Utils';
import OrdenesVentaCliente from '../../../containers/pages/OrdenesVentaCliente';
import useCliente from '../../../hooks/clientes/use-cliente';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';

const DetalleCliente = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [copySuccess, setCopySuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenNPC, setModalOpenNPC] = useState(false);
  const { url } = useRouteMatch();
  const history = useHistory();

  const {
    params: { idCliente },
  } = match;

  const { cliente, isLoading, subirFoto } = useCliente(idCliente);

  useEffect(() => {
    if (copySuccess.length > 0) {
      setTimeout(() => setCopySuccess(''), 3000);
    }
  }, [copySuccess]);

  const copiarDatosCliente = () => {
    navigator.clipboard.writeText(
      `Nombre: ${cliente.nombre} ${cliente.ap_paterno}\nRut: ${formatRut(
        cliente.rut + cliente.dv,
        RutFormat.DOTS_DASH
      )}\nGiro: ${cliente.datos_adicionales.giro}\nDireccion de Facturación: ${
        cliente.datos_adicionales.direccionFacturacion
      }\nDireccion de Despacho: ${
        cliente.datos_adicionales.direccionDespacho
      }\nEmail: ${cliente.email}\nTeléfono: ${
        cliente.datos_adicionales.telefono
      }`
    );
  };

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleModalNPC = () => setModalOpenNPC(!modalOpenNPC);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>
          {cliente.nombre} {cliente.ap_paterno} {cliente.ap_materno}
        </h1>
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
                <IntlMessages id="cliente.asigna-producto" />
              </DropdownItem>
              <DropdownItem onClick={toggleModalNPC}>
                <IntlMessages id="cliente.crea-asigna-producto" />
              </DropdownItem>
              <DropdownItem onClick={() => history.push(`${url}/pos-cliente`)}>
                <IntlMessages id="pos.cliente" />
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
                active: activeTab === 'ovc',
                'nav-link': true,
                'text-uppercase': true,
              })}
              onClick={() => setActiveTab('ovc')}
            >
              <IntlMessages id="dashboards.sales" />
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <ImagenDetalle
                    src={getImagen(cliente.datos_adicionales?.imgURL)}
                    folder="fotosClientes"
                    id={idCliente}
                    idTitle="idCliente"
                    subirFoto={subirFoto}
                  />

                  <CardBody>
                    <DetalleAtributo
                      titulo="cliente.razon-social"
                      item={cliente.razon_social}
                    />
                    <DetalleAtributo
                      titulo="cliente.rut"
                      item={formatRut(
                        cliente.rut + cliente.dv,
                        RutFormat.DOTS_DASH
                      )}
                    />
                    <DetalleAtributo
                      titulo="cliente.email"
                      item={cliente.email}
                    />
                    {cliente.datos_adicionales?.direccionFacturacion && (
                      <>
                        <DetalleAtributo
                          titulo="cliente.direccion-facturacion"
                          item={cliente.datos_adicionales.direccionFacturacion}
                        />
                        <DetalleAtributo
                          titulo="cliente.direccion-despacho"
                          item={cliente.datos_adicionales.direccionDespacho}
                        />
                        <Button
                          color="primary"
                          className="mb-2"
                          onClick={() => {
                            copiarDatosCliente();
                            setCopySuccess('Datos copiados con éxito');
                          }}
                        >
                          <IntlMessages id="clientes.copiar-datos" />
                        </Button>
                        {copySuccess && (
                          <p className="text-muted text-small mb-2">
                            {copySuccess}
                          </p>
                        )}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8">
                <TablaProductosCliente
                  idCliente={idCliente}
                  modalOpenPC={modalOpen}
                  setModalOpenPC={setModalOpen}
                  modalOpenNPC={modalOpenNPC}
                  setModalOpenNPC={setModalOpenNPC}
                />
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="ovc">
            {activeTab === 'ovc' && (
              <OrdenesVentaCliente
                idCliente={idCliente}
                // onChangePage={setCurrentPage}
              />
            )}
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleCliente);
