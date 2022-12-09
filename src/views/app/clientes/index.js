import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoClientes = React.lazy(() =>
  import(
    /* webpackChunkName: "clientes-listado-clientes" */ './listado-clientes'
  )
);
const DetalleCliente = React.lazy(() =>
  import(/* webpackChunkName: "clientes-detalle-cliente" */ './detalle-cliente')
);
const POSCliente = React.lazy(() =>
  import(/* webpackChunkName: "clientes-pos-cliente" */ '../pos/index')
);

const PaginaClientes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idCliente/pos-cliente`}
        render={(props) => <POSCliente {...props} />}
      />
      <Route
        path={`${match.url}/:idCliente`}
        render={(props) => <DetalleCliente {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoClientes {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaClientes;
