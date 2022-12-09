import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoCategorias = React.lazy(() =>
  import(
    /* webpackChunkName: "categorias-listado-categorias" */ './listado-categorias'
  )
);
const DetalleCategoria = React.lazy(() =>
  import(
    /* webpackChunkName: "categorias-detalle-categoria" */ './detalle-categoria'
  )
);

const PaginaCategorias = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idCategoria`}
        render={(props) => <DetalleCategoria {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoCategorias {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaCategorias;
