import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, ButtonGroup } from 'reactstrap';
import { METODOS_PAGO } from '../../constants/enums';
import IntlMessages from '../../helpers/IntlMessages';
import { numberFormat } from '../../helpers/Utils';
import ActionConfirmModal from '../common/ActionConfirmModal';

const PayNowZone = ({
  totalPagar,
  productosOrdenVenta,
  idAlmacenActivo,
  setProductosOrdenVenta,
  setTotalPagar,
  imprimeTicket,
  idCliente,
}) => {
  const [metodoPago, setMetodoPago] = useState(METODOS_PAGO.SIN_SELECCION);
  const [btnPrint, setBtnPrint] = useState(false);
  const [cotModal, setCotModal] = useState(false);

  if (!btnPrint && totalPagar > 0 && metodoPago !== METODOS_PAGO.SIN_SELECCION)
    setBtnPrint(true);
  if (btnPrint && totalPagar === 0) setBtnPrint(false);

  const imprimirTicket = () => {
    const productos = productosOrdenVenta.map((p) => ({
      id: p.id,
      price: p.price,
      qty: p.qty,
      title: p.title,
      totalPagar: p.totalPagar,
      idAlmacen: p.idAlmacen,
      idTipoVenta: p.idTipoVenta,
      fakeStock: p.fakeStock,
    }));

    const payload = {
      productos,
      totalPagar,
      metodoPago,
      idAlmacenActivo,
      idCliente,
    };

    imprimeTicket(payload);

    setProductosOrdenVenta([]);
    setTotalPagar(0);

    setMetodoPago(METODOS_PAGO.SIN_SELECCION);
  };

  const imprimeCotización = () => {
    imprimirTicket();
    setCotModal(!cotModal);
  };

  return (
    <div className="paynow-zone justify-content-between align-items-center">
      <div className="pad-total-pagar d-flex flex-grow-1 min-width-zero">
        <div className="resume-products align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <p className="list-item-heading mb-0">Total</p>
          <p className="mb-1 font-weight-bold text-small2 mw-20 w-sm-100 color-theme-1 text-right pos-total-price">
            ${numberFormat(totalPagar)}
          </p>
        </div>
      </div>
      <p className="text-onefive">
        <IntlMessages id="pos.metodos-pago" />
        {productosOrdenVenta?.length > 0 && totalPagar > 0 && (
          <Button
            color="secondary"
            size="xs"
            outline
            className="float-right"
            onClick={() => {
              setCotModal(!cotModal);
              setMetodoPago(METODOS_PAGO.COTIZACION);
            }}
          >
            <IntlMessages id="pos.quote" />
          </Button>
        )}
      </p>
      <div className="row paynow-zone-payment-container">
        <ButtonGroup>
          <Button
            className="mb-3 col-sm-6 col-lg-4 col-xl-4 btn paynow-zone-payment"
            color="secondary"
            outline
            onClick={() => setMetodoPago(METODOS_PAGO.EFECTIVO)}
            active={metodoPago === METODOS_PAGO.EFECTIVO}
          >
            <i className="iconsminds-coins paynow-zone-icon" />
            <IntlMessages id="pos.cash" />
          </Button>
          <Button
            className="mb-3 col-sm-6 col-lg-4 col-xl-4 btn paynow-zone-payment"
            color="secondary"
            outline
            onClick={() => setMetodoPago(METODOS_PAGO.TARJETA)}
            active={metodoPago === METODOS_PAGO.TARJETA}
          >
            <i className="iconsminds-credit-card paynow-zone-icon" />
            <IntlMessages id="pos.card" />
          </Button>
          <Button
            className="mb-3 col-sm-6 col-lg-4 col-xl-4 btn paynow-zone-payment"
            color="secondary"
            outline
            onClick={() => setMetodoPago(METODOS_PAGO.TRANSFERENCIA)}
            active={metodoPago === METODOS_PAGO.TRANSFERENCIA}
          >
            <i className="iconsminds-bank paynow-zone-icon" />
            <IntlMessages id="pos.transferencia" />
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex-row">
        <Button
          color="primary"
          block
          disabled={!btnPrint}
          className="mb-2 print-ticket"
          onClick={imprimirTicket}
        >
          <IntlMessages id="pos.print-ticket" />
        </Button>
      </div>
      <ActionConfirmModal
        message="¿Está seguro que desea generar esta cotización?"
        accion={imprimeCotización}
        modalOpen={cotModal}
        toggleModal={() => setCotModal(!cotModal)}
        titleButton="modal.crea-cotizacion-imprimir-ticket"
        titleModal="modal.crea-cotizacion"
      />
    </div>
  );
};
export default injectIntl(PayNowZone);
