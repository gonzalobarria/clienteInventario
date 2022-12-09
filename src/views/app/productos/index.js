import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoProductos = React.lazy(() =>
  import(
    /* webpackChunkName: "producto-listado-productos" */ './listado-productos'
  )
);
const DetalleProducto = React.lazy(() =>
  import(
    /* webpackChunkName: "producto-detalle-producto" */ './detalle-producto'
  )
);
const DetalleOrden = React.lazy(() =>
  import(
    /* webpackChunkName: "ordenes-detalle-orden" */ '../ordenes/detalle-orden'
  )
);

const PaginaProductos = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idProducto`}
        render={(props) => <DetalleProducto {...props} />}
      />
      <Route
        path={`${match.url}/:idProducto/:idOrden`}
        render={(props) => <DetalleOrden {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoProductos {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaProductos;
