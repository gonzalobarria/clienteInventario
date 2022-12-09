import React, { useState } from 'react';
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
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import DetalleAtributo from '../../../containers/applications/DetalleAtributo';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import ProductsCategoryTable from '../../../containers/pages/ProductsCategoryTable';
import { getImagen } from '../../../helpers/Utils';
import useCategoria from '../../../hooks/categorias/use-categoria';
import ImagenDetalle from '../../../containers/applications/ImagenDetalle';

const DetalleCategoria = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');

  const {
    params: { idCategoria },
  } = match;

  const { categoria, isLoading, subirFoto } = useCategoria(idCategoria);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row className="disable-text-selection">
      <Colxx xxs="12">
        <h1>{categoria.glosa}</h1>
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
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <ImagenDetalle
                    src={getImagen(categoria.datos_adicionales?.imgURL)}
                    folder="fotosCategorias"
                    id={idCategoria}
                    idTitle="idCategoria"
                    subirFoto={subirFoto}
                  />
                  <CardBody>
                    <DetalleAtributo
                      titulo="pages.description"
                      item={categoria.descripcion}
                    />
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" lg="8">
                <ProductsCategoryTable
                  idCategoria={idCategoria}
                  match={match}
                />
              </Colxx>
            </Row>
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default injectIntl(DetalleCategoria);
