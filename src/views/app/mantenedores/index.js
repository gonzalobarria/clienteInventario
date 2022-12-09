import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Funcionalidades, ProtectedRoute } from '../../../helpers/authHelper';

const ListaMarcas = React.lazy(() =>
  import(/* webpackChunkName: "mantenedores-marcas" */ '../marcas')
);
const ListaProveedores = React.lazy(() =>
  import(/* webpackChunkName: "mantenedores-proveedores" */ '../proveedores')
);
const ListaUsuarios = React.lazy(() =>
  import(/* webpackChunkName: "mantenedores-usuarios" */ '../usuarios')
);
const ListaCategorias = React.lazy(() =>
  import(/* webpackChunkName: "mantenedores-categorias" */ '../categorias')
);

const PaginaMantenedores = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/proveedores`} />
      <ProtectedRoute
        path={`${match.url}/proveedores`}
        component={ListaProveedores}
        funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
      />
      <ProtectedRoute
        path={`${match.url}/marcas`}
        component={ListaMarcas}
        funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
      />
      <ProtectedRoute
        path={`${match.url}/usuarios`}
        component={ListaUsuarios}
        funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
      />
      <ProtectedRoute
        path={`${match.url}/categorias`}
        component={ListaCategorias}
        funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PaginaMantenedores;
