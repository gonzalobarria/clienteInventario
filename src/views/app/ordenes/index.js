import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoOrdenes = React.lazy(() =>
  import(/* webpackChunkName: "orden-listado-ordenes" */ './listado-ordenes')
);
const DetalleOrden = React.lazy(() =>
  import(/* webpackChunkName: "orden-detalle-orden" */ './detalle-orden')
);

const PaginaOrdenes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idOrden`}
        render={(props) => <DetalleOrden {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoOrdenes {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaOrdenes;
