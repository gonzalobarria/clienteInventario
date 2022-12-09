/* eslint-disable react/no-array-index-key */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { injectIntl } from 'react-intl';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenuPOS from '../../components/common/ApplicationMenuPOS';

import ThumbListViewPOS from '../pages/ThumbListViewPOS';
import PayNowZone from '../../components/applications/PayNowZone';

const POSResumenPago = ({
  productosOrdenVenta,
  totalPagar,
  idAlmacenActivo,
  idCliente,
  substractItem,
  addItem,
  changeQty,
  setProductosOrdenVenta,
  setTotalPagar,
  imprimeTicket,
  changeTipoVenta,
}) => {
  return (
    <ApplicationMenuPOS>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="pad-pz">
          <p className="text-onefive">
            <IntlMessages id="pos.current-order" />
          </p>
          <div>
            {productosOrdenVenta?.length === 0 ? (
              <div>
                Agregue productos al carrito para comenzar una nueva venta
              </div>
            ) : (
              productosOrdenVenta?.map((producto, index) => (
                <ThumbListViewPOS
                  key={`${producto.id}#${producto.idAlmacen}#${index}`}
                  producto={producto}
                  substractItem={substractItem}
                  addItem={addItem}
                  productos={productosOrdenVenta}
                  changeQty={changeQty}
                  changeTipoVenta={changeTipoVenta}
                />
              ))
            )}
          </div>
        </div>
      </PerfectScrollbar>
      <PayNowZone
        totalPagar={totalPagar}
        productosOrdenVenta={productosOrdenVenta}
        idAlmacenActivo={idAlmacenActivo}
        setProductosOrdenVenta={setProductosOrdenVenta}
        setTotalPagar={setTotalPagar}
        imprimeTicket={imprimeTicket}
        idCliente={idCliente}
      />
    </ApplicationMenuPOS>
  );
};

export default injectIntl(POSResumenPago);
