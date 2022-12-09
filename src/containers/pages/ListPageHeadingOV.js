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
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // the locale you want
import 'react-datepicker/dist/react-datepicker.css';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../navs/Breadcrumb';
import IntlMessages from '../../helpers/IntlMessages';

import { DataListIcon, ThumbListIcon } from '../../components/svg';

registerLocale('es', es); // register it with the name you want

const ListPageHeadingOV = ({
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
  limpiarBusqueda,
  search,
  startDateRange,
  endDateRange,
  setStartDateRange,
  setEndDateRange,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;

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
            <Row className="mb-2">
              <Colxx xs="12">
                <div className="search-ov d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    autoComplete="off"
                    placeholder={messages['menu.search-ov']}
                    onKeyPress={onSearchKey}
                  />
                </div>
                {search && (
                  <div className="pt-2">
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
              </Colxx>
            </Row>
            <Row>
              <Colxx xs="12" sm="8" lg="4">
                <DatePicker
                  locale="es"
                  selected={startDateRange}
                  onChange={setStartDateRange}
                  placeholderText={messages['forms.date-time-from']}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption={messages['forms.time']}
                />
              </Colxx>
              <Colxx xs="12" sm="8" lg="4">
                <DatePicker
                  locale="es"
                  selected={endDateRange}
                  onChange={setEndDateRange}
                  placeholderText={messages['forms.date-time-to']}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption={messages['forms.time']}
                />
              </Colxx>
            </Row>
            {changeDisplayMode && (
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
            )}

            <div className="d-block d-md-inline-block pt-1">
              {showOrderBy && (
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="pages.orderby" />
                    {selectedOrderOption.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((order, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.id)}
                      >
                        {order.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
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

export default injectIntl(ListPageHeadingOV);
