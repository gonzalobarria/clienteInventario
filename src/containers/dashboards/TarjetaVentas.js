import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import IntlMessages from '../../helpers/IntlMessages';
import LineVentas from '../../components/charts/LineVentas';
import {
  getAlmacenesActivos,
  getOrdenesVentaSemana,
} from '../../redux/actions';
import { getAlmacenActivo, isAdmin } from '../../helpers/Utils';
import { TIPOS_ALMACEN } from '../../constants/enums';

const TarjetaVentas = () => {
  const dispatch = useDispatch();
  const [idAlmacen, setIdAlmacen] = useState(-1);
  const [glosaAlmacen, setGlosaAlmacen] = useState('');

  const { ventasSemana } = useSelector(
    ({ ordenesVentaApp }) => ({
      ventasSemana: ordenesVentaApp.ventasSemana,
    }),
    shallowEqual
  );

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

  useEffect(() => {
    if (typeof idAlmacen === 'string' || idAlmacen instanceof String)
      dispatch(getOrdenesVentaSemana(idAlmacen));

    if (idAlmacen === 0) dispatch(getAlmacenesActivos(TIPOS_ALMACEN.LOCAL));
  }, [dispatch, idAlmacen]);

  const setAlmacen = (almacen) => {
    setIdAlmacen(almacen.id);
    setGlosaAlmacen(almacen.glosa);
  };

  return (
    <Card>
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
          <IntlMessages id="dashboards.sales" />
          <span className="text-muted text-small d-block">
            <IntlMessages id="dashboards.qty-sales" />
          </span>
        </CardTitle>
        <div className="dashboard-line-chart">
          {ventasSemana && <LineVentas shadow data={ventasSemana} />}
        </div>
      </CardBody>
    </Card>
  );
};

export default TarjetaVentas;
