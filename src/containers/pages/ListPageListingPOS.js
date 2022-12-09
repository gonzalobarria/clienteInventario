/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import Pagination from './Pagination';
import ImageListViewPOS from './ImageListViewPOS';

const pageSizes = [9, 12, 18, 24];

const ListPageListingPOS = ({
  items,
  addItem,
  currentPage,
  totalPage,
  onChangePage,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  startIndex,
  endIndex,
  intl,
}) => {
  const { messages } = intl;

  return (
    <Row>
      {items?.map((producto) => (
        <ImageListViewPOS
          key={producto.id}
          producto={producto}
          addItem={addItem}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <div className="col-12">
        <div className="float-md-right pt-1">
          <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} ${messages['general.de']} ${totalItemCount} `}</span>
          <UncontrolledDropdown className="d-inline-block">
            <DropdownToggle caret color="outline-dark" size="xs">
              {selectedPageSize}
            </DropdownToggle>
            <DropdownMenu right>
              {pageSizes.map((size, index) => (
                <DropdownItem key={index} onClick={() => changePageSize(size)}>
                  {size}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </Row>
  );
};

export default React.memo(injectIntl(ListPageListingPOS));
