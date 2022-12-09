import React from 'react';
import { injectIntl } from 'react-intl';

const BusquedaItems = ({ setItemsBusqueda, items, intl }) => {
  const { messages } = intl;

  return (
    <div className="search-sm-tbl d-inline-block mr-1 mb-2 align-middle float-right">
      <input
        type="text"
        name="keyword"
        id="search"
        autoComplete="off"
        placeholder={messages['menu.search']}
        onKeyUp={(e) => {
          if (e.key === 'Enter') e.target.value = '';

          setItemsBusqueda(
            items.filter(
              (item) =>
                item.glosa
                  .toLowerCase()
                  .indexOf(e.target.value.toLowerCase()) !== -1
            )
          );
        }}
      />
    </div>
  );
};

export default injectIntl(BusquedaItems);
