import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ListadoUsuarios = React.lazy(() =>
  import(
    /* webpackChunkName: "usuarios-listado-usuarios" */ './listado-usuarios'
  )
);
const DetalleUsuario = React.lazy(() =>
  import(/* webpackChunkName: "usuarios-detalle-usuario" */ './detalle-usuario')
);

const PaginaUsuarios = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/:idUsuario`}
        render={(props) => <DetalleUsuario {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={(props) => <ListadoUsuarios {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaUsuarios;
