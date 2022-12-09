import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { TIPOS_VENTA } from '../../constants/enums';
import { priceFormat } from '../../helpers/Utils';
import SeleccionaPrecio from './SeleccionaPrecio';

const ThumbListViewPOS = ({
  producto,
  substractItem,
  addItem,
  changeQty,
  changeTipoVenta,
  productos,
}) => {
  const { DETALLE, EMBALAJE } = TIPOS_VENTA;
  const onChange = (e) => changeQty(producto, Number(e.target.value));
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const getNumUnidades = (cant) => `${cant} ${cant === 1 ? 'ud.' : 'uds.'}`;
  const isDuplicado = productos.filter((p) => p.id === producto.id).length > 1;

  return (
    <div className="d-flex flex-row">
      <div className=" d-flex flex-grow-1 min-width-zero">
        <div className="my-2 resume-products align-self-center d-flex flex-row justify-content-between min-width-zero align-items-center">
          <p className="list-item-heading mb-0 text-small2 w-45">
            {producto.title}
            {producto.idTipoVenta === DETALLE &&
              ` (${getNumUnidades(producto.unidadesVenta)})`}
            {producto.idTipoVenta === EMBALAJE && ` (embalaje)`}
          </p>
          <InputGroup className="px-2 list-item-heading mb-0 text-small w-35">
            <InputGroupAddon addonType="append" className="group-btn-pos">
              <Button
                outline={producto.qty > 1}
                color={producto.qty > 1 ? 'secondary' : 'primary'}
                className="btn-eliminar"
                onClick={() => substractItem(producto)}
              >
                {producto.qty <= 1 ? (
                  <i className="simple-icon-trash trash-ico" />
                ) : (
                  `-`
                )}
              </Button>
              <Input
                className="input-pos"
                value={producto.qty}
                onChange={onChange}
              />
              <Button
                outline
                color="secondary"
                className="btn-plus"
                onClick={() => addItem(producto)}
              >
                +
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <p className="mb-0 font-weight-bold text-small2 w-20 rtl color-theme-1">
            {!isDuplicado && !producto.fakeStock ? (
              <NavLink location={{}} to="#" onClick={toggleModal}>
                {priceFormat(producto.totalPagar)}
              </NavLink>
            ) : (
              priceFormat(producto.totalPagar)
            )}
          </p>
          <SeleccionaPrecio
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            producto={producto}
            changeTipoVenta={changeTipoVenta}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThumbListViewPOS);
