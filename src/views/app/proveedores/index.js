import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoProveedores = React.lazy(() =>
  import(
    /* webpackChunkName: "proveedor-listado-proveedores" */ './listado-proveedores'
  )
);
const DetalleProveedor = React.lazy(() =>
  import(
    /* webpackChunkName: "proveedor-detalle-proveedor" */ './detalle-proveedor'
  )
);

const PaginaProveedores = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idProveedor`}
        render={(props) => <DetalleProveedor {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoProveedores {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaProveedores;
