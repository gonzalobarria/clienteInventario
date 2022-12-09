import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoOrdenesVenta = React.lazy(() =>
  import(
    /* webpackChunkName: "ordenes-venta-listado-ordenes-venta" */ './listado-ordenes-venta'
  )
);
const DetalleOrdenVenta = React.lazy(() =>
  import(
    /* webpackChunkName: "ordenes-venta-detalle-orden-venta" */ './detalle-orden-venta'
  )
);

const PaginaOrdenesVenta = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idOrdenVenta`}
        render={(props) => <DetalleOrdenVenta {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoOrdenesVenta {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaOrdenesVenta;
