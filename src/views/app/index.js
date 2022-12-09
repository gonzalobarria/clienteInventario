import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import { ProtectedRoute, Funcionalidades } from '../../helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Almacenes = React.lazy(() =>
  import(/* webpackChunkName: "almacenes" */ './almacenes')
);
const Clientes = React.lazy(() =>
  import(/* webpackChunkName: "clientes" */ './clientes')
);
const Mantenedores = React.lazy(() =>
  import(/* webpackChunkName: "mantenedores" */ './mantenedores')
);
const Ordenes = React.lazy(() =>
  import(/* webpackChunkName: "ordenes" */ './ordenes')
);
const OrdenesVenta = React.lazy(() =>
  import(/* webpackChunkName: "ordenes-venta" */ './ordenes-venta')
);
const POS = React.lazy(() => import(/* webpackChunkName: "pos" */ './pos'));
const Productos = React.lazy(() =>
  import(/* webpackChunkName: "productos" */ './productos')
);
const Proveedores = React.lazy(() =>
  import(/* webpackChunkName: "proveedores" */ './proveedores')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <ProtectedRoute
              path={`${match.url}/clientes`}
              component={Clientes}
              funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <ProtectedRoute
              path={`${match.url}/almacenes`}
              component={Almacenes}
              funcionalidades={[Funcionalidades.Ver_Almacen]}
            />
            <ProtectedRoute
              path={`${match.url}/mantenedores`}
              component={Mantenedores}
              funcionalidades={[Funcionalidades.Control_Total_del_Negocio]}
            />
            <ProtectedRoute
              path={`${match.url}/ordenes`}
              component={Ordenes}
              funcionalidades={[Funcionalidades.Ver_Orden]}
            />
            <ProtectedRoute
              path={`${match.url}/ordenes-venta`}
              component={OrdenesVenta}
              funcionalidades={[Funcionalidades.Ver_Orden_Venta]}
            />
            <ProtectedRoute
              path={`${match.url}/pos`}
              component={POS}
              funcionalidades={[Funcionalidades.Agregar_Orden_Venta]}
            />
            <ProtectedRoute
              path={`${match.url}/productos`}
              component={Productos}
              funcionalidades={[Funcionalidades.Ver_Producto]}
            />
            <ProtectedRoute
              path={`${match.url}/proveedores`}
              component={Proveedores}
              funcionalidades={[Funcionalidades.Ver_Proveedor]}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
