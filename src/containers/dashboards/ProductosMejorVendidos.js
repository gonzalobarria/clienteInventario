import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import { getAlmacenActivo, isAdmin } from '../../helpers/Utils';
import Table from '../pages/Table';
import { getProductosMejorVendidos } from '../../redux/actions';

const ProductosMejorVendidos = ({ intl }) => {
  const { messages } = intl;

  const dispatch = useDispatch();
  const [idAlmacen, setIdAlmacen] = useState(-1);
  const [glosaAlmacen, setGlosaAlmacen] = useState('');

  const { productos } = useSelector(
    ({ productosApp }) => ({
      productos: productosApp.productosMejorVendidos,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (typeof idAlmacen === 'string' || idAlmacen instanceof String)
      dispatch(getProductosMejorVendidos(idAlmacen));
  }, [dispatch, idAlmacen]);

  const { almacenes } = useSelector(
    ({ tiposAlmacenApp }) => ({
      almacenes: tiposAlmacenApp.almacenesActivos,
    }),
    shallowEqual
  );

  useEffect(() => {
    const almacenesUsuario = getAlmacenActivo();
    if (almacenesUsuario.length > 0)
      setIdAlmacen(almacenesUsuario[0].id_almacen);
    else if (isAdmin()) setIdAlmacen(0);
  }, []);

  const setAlmacen = (almacen) => {
    setIdAlmacen(almacen.id);
    setGlosaAlmacen(almacen.glosa);
  };

  const cols = React.useMemo(
    () => [
      {
        Header: messages['productos.nombre'],
        accessor: 'glosa',
        cellClass: 'text-muted w-50',
        Cell: ({ value }) => <>{value}</>,
        sortType: 'basic',
      },
      {
        Header: messages['productos.cant_ventas'],
        accessor: 'cant_ventas',
        cellClass: 'text-muted w-25',
        Cell: ({ value }) => <>{value}</>,
        sortType: 'basic',
      },
      {
        Header: messages['productos.stock'],
        accessor: 'stock_disponible',
        cellClass: 'text-muted w-25',
        Cell: ({ value }) => <>{value}</>,
        sortType: 'basic',
      },
    ],
    [messages]
  );

  return (
    <Card className="h-100">
      {isAdmin() && almacenes && (
        <div className="position-absolute card-top-buttons">
          <UncontrolledDropdown>
            <DropdownToggle caret color="primary" className="btn-xs" outline>
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
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.best-sellers" />
        </CardTitle>
        {productos && <Table columns={cols} data={productos} />}
      </CardBody>
    </Card>
  );
};

export default injectIntl(ProductosMejorVendidos);
