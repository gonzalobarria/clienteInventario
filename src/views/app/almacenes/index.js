import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoAlmacenes = React.lazy(() =>
  import(
    /* webpackChunkName: "almacenes-listado-almacenes" */ './listado-almacenes'
  )
);
const DetalleAlmacen = React.lazy(() =>
  import(
    /* webpackChunkName: "almacenes-detalle-almacen" */ './detalle-almacen'
  )
);

const PaginaAlmacenes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        exact
        path={`${match.url}/bodegas`}
        render={(props) => <ListadoAlmacenes esBodega {...props} />}
      />
      <Route
        exact
        path={`${match.url}/locales`}
        render={(props) => <ListadoAlmacenes {...props} />}
      />
      <Route
        path={`${match.url}/bodegas/:idAlmacen`}
        render={(props) => <DetalleAlmacen {...props} />}
      />
      <Route
        path={`${match.url}/locales/:idAlmacen`}
        render={(props) => <DetalleAlmacen {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaAlmacenes;
