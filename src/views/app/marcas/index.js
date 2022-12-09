import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoMarcas = React.lazy(() =>
  import(/* webpackChunkName: "marcas-listado-marcas" */ './listado-marcas')
);
const DetalleMarca = React.lazy(() =>
  import(/* webpackChunkName: "marcas-detalle-marca" */ './detalle-marca')
);

const PaginaMarcas = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idMarca`}
        render={(props) => <DetalleMarca {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoMarcas {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaMarcas;
