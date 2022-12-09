import React from 'react';
import IntlMessages from '../../helpers/IntlMessages';
import { numberFormat, priceFormat } from '../../helpers/Utils';

const DetalleAtributo = ({ titulo, item, precio = false, numero = false }) => {
  if (!item) return <></>;

  let detalle = item;
  if (precio) detalle = priceFormat(item);
  if (numero) detalle = numberFormat(item);

  return (
    <>
      <p className="text-muted text-small mb-2">
        <IntlMessages id={titulo} />
      </p>
      <p className="mb-3 mx-2">{detalle}</p>
    </>
  );
};

export default DetalleAtributo;
