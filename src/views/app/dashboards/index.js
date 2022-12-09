/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import ProductosMejorVendidos from '../../../containers/dashboards/ProductosMejorVendidos';
import TarjetaVentas from '../../../containers/dashboards/TarjetaVentas';
import GraficosVentasMonto from '../../../containers/dashboards/GraficosVentasMonto';
import { isAdmin } from '../../../helpers/Utils';
import { getAlmacenesActivos } from '../../../redux/actions';
import { TIPOS_ALMACEN } from '../../../constants/enums';
import ProductosBajoStock from '../../../containers/dashboards/ProductosBajoStock';
import DescargaPDFProductos from '../../../containers/dashboards/DescargaPDFProductos';

const DefaultDashboard = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlmacenesActivos(TIPOS_ALMACEN.LOCAL));
  }, [dispatch]);

  return (
    <div className="disable-text-selection">
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.dashboards" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {isAdmin() && (
        <Row>
          <Colxx xxs="12" className="mb-4">
            <GraficosVentasMonto />
          </Colxx>
        </Row>
      )}
      <Row>
        <Colxx xxs="12" className="mb-4">
          <DescargaPDFProductos />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <TarjetaVentas />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <ProductosMejorVendidos />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <ProductosBajoStock local />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <ProductosBajoStock />
        </Colxx>
      </Row>
    </div>
  );
};
export default injectIntl(DefaultDashboard);
