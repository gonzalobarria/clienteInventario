/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../navs/Breadcrumb';
import IntlMessages from '../../helpers/IntlMessages';

import { DataListIcon, ThumbListIcon } from '../../components/svg';

const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  showAddNewButton,
  showOrderBy = true,
  showSearch = true,
  limpiarBusqueda,
  search,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;

  const getLabel = (label) =>
    label.indexOf('.') !== -1 ? messages[label] : label;

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            {showAddNewButton && (
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={toggleModal}
              >
                <IntlMessages id="pages.add-new" />
              </Button>
            )}
          </div>
          <Breadcrumb match={match} />
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <span className="mr-3 d-inline-block float-md-left">
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'list' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('list')}
              >
                <DataListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'thumblist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('thumblist')}
              >
                <ThumbListIcon />
              </a>
            </span>

            <div className="d-block d-md-inline-block pt-1">
              {showOrderBy && (
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="pages.orderby" />
                    {getLabel(selectedOrderOption.label)}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((order, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.id)}
                      >
                        {getLabel(order.label)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {showSearch && (
                <>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      autoComplete="off"
                      placeholder={messages['menu.search']}
                      onKeyPress={onSearchKey}
                    />
                  </div>
                  {search && (
                    <div className="float-md-right pt-1">
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
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} ${messages['general.de']} ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => changePageSize(size)}
                    >
                      {size}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
