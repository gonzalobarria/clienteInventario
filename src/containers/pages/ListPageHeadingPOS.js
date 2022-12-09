import React, { useState } from 'react';
import {
  Row,
  Button,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import FormikCategoriesPOS from '../form-validations/FormikCategoriesPOS';
import { isAdmin } from '../../helpers/Utils';

const ListPageHeadingPOS = ({
  setCategoria,
  intl,
  onSearchKey,
  modo,
  setModo,
  setCurrentPage,
  almacenes,
  idAlmacen,
  setIdAlmacen,
  glosaAlmacen,
  setGlosaAlmacen,
  limpiarBusqueda,
  search,
  match,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const history = useHistory();
  const {
    params: { idCliente },
  } = match;

  const { messages } = intl;
  const setAlmacen = (almacen) => {
    setIdAlmacen(almacen.id);
    setGlosaAlmacen(almacen.glosa);
  };
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1 className="pr-3">
            <div className="d-flex flex-column">
              <IntlMessages id="menu.pos" /> {idCliente ? 'Cliente' : ''}
              {idCliente && (
                <NavLink
                  location={{}}
                  to="#"
                  onClick={() => history.push(`/app/clientes/${idCliente}`)}
                  className="text-small2 text-muted pt-1"
                >
                  <IntlMessages id="menu.volver-cliente" />
                </NavLink>
              )}
            </div>
          </h1>

          {isAdmin() && almacenes && (
            <div className="pt-0 pr-3 mb-2 d-sm-inline-block d-xs-inline-block d-lg-inline-block d-md-inline-block">
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  className="btn-xs"
                  outline
                >
                  {glosaAlmacen}
                </DropdownToggle>
                <DropdownMenu right>
                  {almacenes?.map((almacen, index) => {
                    if (idAlmacen === 0 && index === 0) setAlmacen(almacen);
                    return (
                      <DropdownItem
                        key={almacen.id}
                        onClick={() => setAlmacen(almacen)}
                      >
                        {almacen.glosa}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
          {modo === 'manual' && (
            <>
              <div className="search-sm d-inline-block mr-1 mb-2 align-middle">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  autoComplete="off"
                  placeholder={messages['menu.search']}
                  onKeyPress={onSearchKey}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') e.target.value = '';
                  }}
                />
              </div>
              {search && (
                <div className="d-inline-block">
                  <NavLink
                    to="#"
                    onClick={() => limpiarBusqueda()}
                    location={{}}
                    className="pl-1 text-small"
                  >
                    <i className="simple-icon-trash" />{' '}
                    <IntlMessages id="button.limpiar-busqueda" />
                  </NavLink>
                </div>
              )}
            </>
          )}

          <Button
            color="primary"
            size="btn-sm"
            className="float-sm-right"
            onClick={() => setModo(modo === 'scanner' ? 'manual' : 'scanner')}
          >
            MODO {modo === 'scanner' ? 'MANUAL' : 'SCANNER'}
          </Button>
        </div>

        <div>
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.category" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse isOpen={displayOptionsIsOpen} className="d-md-block">
            <div className="d-block d-md-inline-block pt-1">
              <FormikCategoriesPOS
                setCategoria={setCategoria}
                setCurrentPage={setCurrentPage}
                idAlmacen={idAlmacen}
              />
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeadingPOS);
