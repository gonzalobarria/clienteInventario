/* eslint-disable import/no-cycle */
import {
  PRODUCTOS_ALMACEN_GET_LIST,
  PRODUCTOS_ALMACEN_GET_LIST_SUCCESS,
  PRODUCTOS_ALMACEN_GET_LIST_ERROR,
  PRODUCTOS_CLIENTE_GET_LIST,
  PRODUCTOS_CLIENTE_GET_LIST_SUCCESS,
  PRODUCTOS_CLIENTE_GET_LIST_ERROR,
  PRODUCTOS_NEGOCIO_GET_LIST,
  PRODUCTOS_NEGOCIO_GET_LIST_SUCCESS,
  PRODUCTOS_NEGOCIO_GET_LIST_ERROR,
  PRODUCTOS_CLIENTE_ADD_ITEM,
  PRODUCTOS_CLIENTE_ADD_ITEM_SUCCESS,
  PRODUCTOS_CLIENTE_ADD_ITEM_ERROR,
  PRODUCTOS_NEGOCIO_ADD_ITEM,
  PRODUCTOS_NEGOCIO_ADD_ITEM_SUCCESS,
  PRODUCTOS_NEGOCIO_ADD_ITEM_ERROR,
  PRODUCTOS_NEGOCIO_DELETE_ITEM,
  PRODUCTOS_NEGOCIO_DELETE_ITEM_SUCCESS,
  PRODUCTOS_NEGOCIO_DELETE_ITEM_ERROR,
  PRODUCTOS_PROVEEDOR_GET_LIST,
  PRODUCTOS_PROVEEDOR_GET_LIST_SUCCESS,
  PRODUCTOS_PROVEEDOR_GET_LIST_ERROR,
  PRODUCTOS_CLIENTE_DELETE_ITEM,
  PRODUCTOS_CLIENTE_DELETE_ITEM_SUCCESS,
  PRODUCTOS_CLIENTE_DELETE_ITEM_ERROR,
  PRODUCTOS_CLIENTE_UPD_ITEM,
  PRODUCTOS_CLIENTE_UPD_ITEM_SUCCESS,
  PRODUCTOS_CLIENTE_UPD_ITEM_ERROR,
  PRODUCTOS_NEGOCIO_GET_LIST_FREE,
  PRODUCTOS_NEGOCIO_GET_LIST_FREE_SUCCESS,
  PRODUCTOS_NEGOCIO_GET_LIST_FREE_ERROR,
  PRODUCTOS_ALMACEN_UPD_ITEM,
  PRODUCTOS_ALMACEN_UPD_ITEM_SUCCESS,
  PRODUCTOS_ALMACEN_UPD_ITEM_ERROR,
  PRODUCTOS_ALMACEN_DELETE_ITEM,
  PRODUCTOS_ALMACEN_DELETE_ITEM_SUCCESS,
  PRODUCTOS_ALMACEN_DELETE_ITEM_ERROR,
  PRODUCTOS_MARCA_GET_LIST,
  PRODUCTOS_MARCA_GET_LIST_SUCCESS,
  PRODUCTOS_MARCA_GET_LIST_ERROR,
  PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST,
  PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_SUCCESS,
  PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_ERROR,
  PRODUCTOS_ALMACEN_ADD_ITEM,
  PRODUCTOS_ALMACEN_ADD_ITEM_SUCCESS,
  PRODUCTOS_ALMACEN_ADD_ITEM_ERROR,
  PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST,
  PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_SUCCESS,
  PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_ERROR,
  PRODUCTOS_ORDEN_GET_LIST,
  PRODUCTOS_ORDEN_GET_LIST_SUCCESS,
  PRODUCTOS_ORDEN_GET_LIST_ERROR,
  PRODUCTOS_ORDEN_UPD_ITEM,
  PRODUCTOS_ORDEN_UPD_ITEM_SUCCESS,
  PRODUCTOS_ORDEN_UPD_ITEM_ERROR,
  PRODUCTOS_ORDEN_ADD_ITEM,
  PRODUCTOS_ORDEN_ADD_ITEM_SUCCESS,
  PRODUCTOS_ORDEN_ADD_ITEM_ERROR,
  PRODUCTOS_CATEGORIA_GET_LIST,
  PRODUCTOS_CATEGORIA_GET_LIST_SUCCESS,
  PRODUCTOS_CATEGORIA_GET_LIST_ERROR,
  PRODUCTOS_ALMACEN_VENTA_GET_LIST,
  PRODUCTOS_ALMACEN_VENTA_GET_LIST_SUCCESS,
  PRODUCTOS_ALMACEN_VENTA_GET_LIST_ERROR,
  PRODUCTOS_ORDEN_VENTA_GET_LIST,
  PRODUCTOS_ORDEN_VENTA_GET_LIST_SUCCESS,
  PRODUCTOS_ORDEN_VENTA_GET_LIST_ERROR,
  PRODUCTOS_MEJOR_VENDIDOS_GET_LIST,
  PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_SUCCESS,
  PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_ERROR,
} from '../actions';

export const insProductoNegocio = (item) => ({
  type: PRODUCTOS_NEGOCIO_ADD_ITEM,
  payload: item,
});

export const insProductoNegocioSuccess = (items) => ({
  type: PRODUCTOS_NEGOCIO_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insProductoNegocioError = (error) => ({
  type: PRODUCTOS_NEGOCIO_ADD_ITEM_ERROR,
  payload: error,
});

export const getProductosAlmacen = (params) => ({
  type: PRODUCTOS_ALMACEN_GET_LIST,
  payload: params,
});

export const getProductosAlmacenSuccess = (items) => ({
  type: PRODUCTOS_ALMACEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosAlmacenError = (error) => ({
  type: PRODUCTOS_ALMACEN_GET_LIST_ERROR,
  payload: error,
});

export const getProductosCliente = (params) => ({
  type: PRODUCTOS_CLIENTE_GET_LIST,
  payload: params,
});

export const getProductosClienteSuccess = (items) => ({
  type: PRODUCTOS_CLIENTE_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosClienteError = (error) => ({
  type: PRODUCTOS_CLIENTE_GET_LIST_ERROR,
  payload: error,
});

export const getProductosNegocio = (params) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST,
  payload: params,
});

export const getProductosNegocioSuccess = (items) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosNegocioError = (error) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST_ERROR,
  payload: error,
});

export const insProductoCliente = (item) => ({
  type: PRODUCTOS_CLIENTE_ADD_ITEM,
  payload: item,
});

export const insProductoClienteSuccess = (items) => ({
  type: PRODUCTOS_CLIENTE_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insProductoClienteError = (error) => ({
  type: PRODUCTOS_CLIENTE_ADD_ITEM_ERROR,
  payload: error,
});

export const delProductoNegocio = (item) => ({
  type: PRODUCTOS_NEGOCIO_DELETE_ITEM,
  payload: item,
});

export const delProductoNegocioSuccess = (items) => ({
  type: PRODUCTOS_NEGOCIO_DELETE_ITEM_SUCCESS,
  payload: items,
});

export const delProductoNegocioError = (error) => ({
  type: PRODUCTOS_NEGOCIO_DELETE_ITEM_ERROR,
  payload: error,
});

export const getProductosProveedor = (params) => ({
  type: PRODUCTOS_PROVEEDOR_GET_LIST,
  payload: params,
});

export const getProductosProveedorSuccess = (items) => ({
  type: PRODUCTOS_PROVEEDOR_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosProveedorError = (error) => ({
  type: PRODUCTOS_PROVEEDOR_GET_LIST_ERROR,
  payload: error,
});

export const delProductoCliente = (params) => ({
  type: PRODUCTOS_CLIENTE_DELETE_ITEM,
  payload: params,
});

export const delProductoClienteSuccess = (items) => ({
  type: PRODUCTOS_CLIENTE_DELETE_ITEM_SUCCESS,
  payload: items,
});

export const delProductoClienteError = (error) => ({
  type: PRODUCTOS_CLIENTE_DELETE_ITEM_ERROR,
  payload: error,
});

export const updProductoCliente = (params) => ({
  type: PRODUCTOS_CLIENTE_UPD_ITEM,
  payload: params,
});

export const updProductoClienteSuccess = (items) => ({
  type: PRODUCTOS_CLIENTE_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updProductoClienteError = (error) => ({
  type: PRODUCTOS_CLIENTE_UPD_ITEM_ERROR,
  payload: error,
});

export const getProductosNegocioLibres = (params) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST_FREE,
  payload: params,
});

export const getProductosNegocioLibresSuccess = (items) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST_FREE_SUCCESS,
  payload: items,
});

export const getProductosNegocioLibresError = (error) => ({
  type: PRODUCTOS_NEGOCIO_GET_LIST_FREE_ERROR,
  payload: error,
});

export const updProductoAlmacen = (params) => ({
  type: PRODUCTOS_ALMACEN_UPD_ITEM,
  payload: params,
});

export const updProductoAlmacenSuccess = (items) => ({
  type: PRODUCTOS_ALMACEN_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updProductoAlmacenError = (error) => ({
  type: PRODUCTOS_ALMACEN_UPD_ITEM_ERROR,
  payload: error,
});

export const delProductoAlmacen = (params) => ({
  type: PRODUCTOS_ALMACEN_DELETE_ITEM,
  payload: params,
});

export const delProductoAlmacenSuccess = (items) => ({
  type: PRODUCTOS_ALMACEN_DELETE_ITEM_SUCCESS,
  payload: items,
});

export const delProductoAlmacenError = (error) => ({
  type: PRODUCTOS_ALMACEN_DELETE_ITEM_ERROR,
  payload: error,
});

export const getProductosMarca = (params) => ({
  type: PRODUCTOS_MARCA_GET_LIST,
  payload: params,
});

export const getProductosMarcaSuccess = (items) => ({
  type: PRODUCTOS_MARCA_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosMarcaError = (error) => ({
  type: PRODUCTOS_MARCA_GET_LIST_ERROR,
  payload: error,
});

export const getProductosNoEstanAlmacen = (params) => ({
  type: PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST,
  payload: params,
});

export const getProductosNoEstanAlmacenSuccess = (items) => ({
  type: PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosNoEstanAlmacenError = (error) => ({
  type: PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_ERROR,
  payload: error,
});

export const insProductoAlmacen = (item) => ({
  type: PRODUCTOS_ALMACEN_ADD_ITEM,
  payload: item,
});

export const insProductoAlmacenSuccess = (items) => ({
  type: PRODUCTOS_ALMACEN_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insProductoAlmacenError = (error) => ({
  type: PRODUCTOS_ALMACEN_ADD_ITEM_ERROR,
  payload: error,
});

export const getProductosOrden = (params) => ({
  type: PRODUCTOS_ORDEN_GET_LIST,
  payload: params,
});

export const getProductosOrdenSuccess = (items) => ({
  type: PRODUCTOS_ORDEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosOrdenError = (error) => ({
  type: PRODUCTOS_ORDEN_GET_LIST_ERROR,
  payload: error,
});

export const getProductosNoEstanOrden = (params) => ({
  type: PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST,
  payload: params,
});

export const getProductosNoEstanOrdenSuccess = (items) => ({
  type: PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosNoEstanOrdenError = (error) => ({
  type: PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_ERROR,
  payload: error,
});

export const updProductoOrden = (params) => ({
  type: PRODUCTOS_ORDEN_UPD_ITEM,
  payload: params,
});

export const updProductoOrdenSuccess = (items) => ({
  type: PRODUCTOS_ORDEN_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updProductoOrdenError = (error) => ({
  type: PRODUCTOS_ORDEN_UPD_ITEM_ERROR,
  payload: error,
});

export const insProductoOrden = (item) => ({
  type: PRODUCTOS_ORDEN_ADD_ITEM,
  payload: item,
});

export const insProductoOrdenSuccess = (items) => ({
  type: PRODUCTOS_ORDEN_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insProductoOrdenError = (error) => ({
  type: PRODUCTOS_ORDEN_ADD_ITEM_ERROR,
  payload: error,
});

export const getProductosCategoria = (params) => ({
  type: PRODUCTOS_CATEGORIA_GET_LIST,
  payload: params,
});

export const getProductosCategoriaSuccess = (items) => ({
  type: PRODUCTOS_CATEGORIA_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosCategoriaError = (error) => ({
  type: PRODUCTOS_CATEGORIA_GET_LIST_ERROR,
  payload: error,
});

export const getProductosAlmacenVenta = (params) => ({
  type: PRODUCTOS_ALMACEN_VENTA_GET_LIST,
  payload: params,
});

export const getProductosAlmacenVentaSuccess = (items) => ({
  type: PRODUCTOS_ALMACEN_VENTA_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosAlmacenVentaError = (error) => ({
  type: PRODUCTOS_ALMACEN_VENTA_GET_LIST_ERROR,
  payload: error,
});

export const getProductosOrdenVenta = (params) => ({
  type: PRODUCTOS_ORDEN_VENTA_GET_LIST,
  payload: params,
});

export const getProductosOrdenVentaSuccess = (items) => ({
  type: PRODUCTOS_ORDEN_VENTA_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosOrdenVentaError = (error) => ({
  type: PRODUCTOS_ORDEN_VENTA_GET_LIST_ERROR,
  payload: error,
});

export const getProductosMejorVendidos = (params) => ({
  type: PRODUCTOS_MEJOR_VENDIDOS_GET_LIST,
  payload: params,
});

export const getProductosMejorVendidosSuccess = (items) => ({
  type: PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductosMejorVendidosError = (error) => ({
  type: PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_ERROR,
  payload: error,
});
