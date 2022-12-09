import React, { useEffect, useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CardTitle } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import ListPageHeadingPOS from './ListPageHeadingPOS';
import ListPageListingPOS from './ListPageListingPOS';

const POSProductList = ({
  match,
  productos,
  currentPage,
  setCurrentPage,
  selectedPageSize,
  setSelectedPageSize,
  addItem,
  setCategoria,
  searchBarcode,
  almacenes,
  idAlmacen,
  setIdAlmacen,
  glosaAlmacen,
  setGlosaAlmacen,
  limpiarBusqueda,
  search,
  onSearchKey,
}) => {
  const [modo, setModo] = useState('manual');

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const inputRef = useRef(null);

  useEffect(() => {
    if (modo === 'scanner') {
      inputRef.current.focus();
    }
  }, [modo]);

  const onMouseOut = () => inputRef.current.focus();

  return (
    <>
      <div className="disable-text-selection">
        <ListPageHeadingPOS
          match={match}
          setCategoria={setCategoria}
          onSearchKey={onSearchKey}
          modo={modo}
          setModo={setModo}
          setCurrentPage={setCurrentPage}
          almacenes={almacenes}
          idAlmacen={idAlmacen}
          setIdAlmacen={setIdAlmacen}
          glosaAlmacen={glosaAlmacen}
          setGlosaAlmacen={setGlosaAlmacen}
          limpiarBusqueda={limpiarBusqueda}
          search={search}
        />
        {modo === 'scanner' ? (
          <>
            <CardTitle>
              <IntlMessages id="pos.title-scan" />
            </CardTitle>
            <input
              type="text"
              name="keyword"
              id="search_barcode"
              autoComplete="off"
              ref={inputRef}
              onMouseOut={onMouseOut}
              onBlur={onMouseOut}
              className="form-control rounded"
              placeholder="Ingrese Código de Barras"
              onKeyPress={searchBarcode}
            />
          </>
        ) : (
          <ListPageListingPOS
            items={productos?.data}
            addItem={addItem}
            currentPage={currentPage}
            totalPage={productos?.totalPage}
            onChangePage={setCurrentPage}
            changePageSize={setSelectedPageSize}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItemCount={productos?.totalItem}
            selectedPageSize={selectedPageSize}
          />
        )}
      </div>
    </>
  );
};

export default injectIntl(POSProductList);
