import React, { useEffect } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Colxx } from '../../components/common/CustomBootstrap';

import { getOrdenesVentaSemanaMonto } from '../../redux/actions';
import VentasLocal from '../../components/charts/VentasLocal';

const GraficosVentasMonto = ({ itemClass = 'dashboard-small-chart' }) => {
  const dispatch = useDispatch();

  const { ventasSemanaMonto } = useSelector(
    ({ ordenesVentaApp }) => ({
      ventasSemanaMonto: ordenesVentaApp.ventasSemanaMonto,
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
    dispatch(getOrdenesVentaSemanaMonto());
  }, [dispatch]);

  return (
    <Row>
      {ventasSemanaMonto?.map((vsm) => (
        <Colxx xxs="12" xs="6" lg="3" className="mb-4" key={vsm.idAlmacen}>
          <Card className={itemClass}>
            <CardBody>
              <VentasLocal fullData={vsm} almacenes={almacenes} />
            </CardBody>
          </Card>
        </Colxx>
      ))}
    </Row>
  );
};

export default GraficosVentasMonto;
