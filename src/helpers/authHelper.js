/* eslint-disable import/no-cycle */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkFuncionalidades, getCurrentUser } from './Utils';

const ProtectedRoute = ({
  component: Component,
  funcionalidades = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      if (funcionalidades) {
        if (checkFuncionalidades(funcionalidades))
          return <Component {...props} />;

        return (
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: props.location },
            }}
          />
        );
      }

      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/user/login',
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={setComponent} />;
};

const Funcionalidades = {
  Control_Total_de_la_Plataforma: 100,
  Control_Total_del_Negocio: 200,
  Ingresar_Almacen: 301,
  Ver_Almacen: 302,
  Actualizar_Almacen: 303,
  Eliminar_Almacen: 304,
  Agregar_Producto_al_Almacén: 401,
  Ver_Producto_del_Almacén: 402,
  Actualizar_Producto_del_Almacén: 403,
  Eliminar_Producto_del_Almacén: 404,
  Crear_Orden: 501,
  Ver_Orden: 502,
  Actualizar_Orden: 503,
  Eliminar_Orden: 504,
  Ingresar_Proveedor: 601,
  Ver_Proveedor: 602,
  Actualizar_Proveedor: 603,
  Eliminar_Proveedor: 604,
  Agregar_Producto: 701,
  Ver_Producto: 702,
  Actualizar_Producto: 703,
  Eliminar_Producto: 704,
  Asociar_Producto_a_un_Proveedor: 801,
  Ver_Asociación_de_Productos_con_Proveedor: 802,
  Actualizar_Asociación_de_Productos_con_Proveedor: 803,
  Eliminar_Asociación_de_Productos_con_Proveedor: 804,
  Ingresar_Negocio: 901,
  Ver_Negocio: 902,
  Actualizar_Negocio: 903,
  Eliminar_Negocio: 904,
  Agregar_Usuario: 1001,
  Ver_Usuario: 1002,
  Actualizar_Usuario: 1003,
  Eliminar_Usuario: 1004,
  Agregar_Marca: 1101,
  Ver_Marca: 1102,
  Actualizar_Marca: 1103,
  Eliminar_Marca: 1104,
  Agregar_Cliente: 1201,
  Ver_Cliente: 1202,
  Actualizar_Cliente: 1203,
  Eliminar_Cliente: 1204,
  Agregar_Categoria: 1301,
  Ver_Categoria: 1302,
  Actualizar_Categoria: 1303,
  Eliminar_Categoria: 1304,
  Agregar_Orden_Venta: 1401,
  Ver_Orden_Venta: 1402,
  Actualizar_Orden_Venta: 1403,
  Eliminar_Orden_Venta: 1404,
  Control_Total_del_Proveedor: 2000,
};

export { ProtectedRoute, Funcionalidades };
