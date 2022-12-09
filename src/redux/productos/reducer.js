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
  PRODUCTOS_NEGOCIO_ADD_ITEM,
  PRODUCTOS_NEGOCIO_ADD_ITEM_SUCCESS,
  PRODUCTOS_NEGOCIO_ADD_ITEM_ERROR,
  PRODUCTOS_CLIENTE_ADD_ITEM,
  PRODUCTOS_CLIENTE_ADD_ITEM_SUCCESS,
  PRODUCTOS_CLIENTE_ADD_ITEM_ERROR,
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
  PRODUCTOS_NEGOCIO_UPD_ITEM,
  PRODUCTOS_NEGOCIO_UPD_ITEM_SUCCESS,
  PRODUCTOS_NEGOCIO_UPD_ITEM_ERROR,
  PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM,
  PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM_SUCCESS,
  PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM_ERROR,
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

const INIT_STATE = {
  productos: null,
  productosCliente: null,
  productosNegocio: null,
  productosTodos: null,
  productosMarca: null,
  productosNoEstanAlmacen: null,
  productosAlmacen: null,
  productosProveedor: null,
  productosNegocioLibres: null,
  productosNoEstanOrden: null,
  productosOrden: null,
  productosCategoria: null,
  productosAlmacenVenta: null,
  productosOrdenVenta: null,
  productosMejorVendidos: null,
  error: '',
  errorPNL: '',
  errorPO: '',
  errorPA: '',
  errorPAV: '',
  errorPOV: '',
  errorPMV: '',
  loading: false,
  loadingPC: false,
  loadingPN: false,
  loadingTodos: false,
  loadingPM: false,
  loadingPNA: false,
  loadingPNO: false,
  loadingPA: false,
  loadingPP: false,
  loadingPNL: false,
  loadingPO: false,
  loadingPCAT: false,
  loadingPAV: false,
  loadingPOV: false,
  loadingPMV: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCTOS_NEGOCIO_ADD_ITEM:
      return { ...state, loadingPN: false };

    case PRODUCTOS_NEGOCIO_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPN: true,
        productosNegocio: action.payload,
      };

    case PRODUCTOS_NEGOCIO_ADD_ITEM_ERROR:
      return { ...state, loadingPN: true, error: action.payload };

    case PRODUCTOS_ALMACEN_GET_LIST:
      return { ...state, loadingPA: false };

    case PRODUCTOS_ALMACEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPA: true,
        productosAlmacen: action.payload,
      };

    case PRODUCTOS_ALMACEN_GET_LIST_ERROR:
      return { ...state, loadingPA: true, errorPA: action.payload };

    case PRODUCTOS_CLIENTE_GET_LIST:
      return { ...state, loadingPC: false };

    case PRODUCTOS_CLIENTE_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPC: true,
        productosCliente: action.payload,
      };

    case PRODUCTOS_CLIENTE_GET_LIST_ERROR:
      return { ...state, loadingPC: true, error: action.payload };

    case PRODUCTOS_NEGOCIO_GET_LIST:
      return { ...state, loadingPN: false };

    case PRODUCTOS_NEGOCIO_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPN: true,
        productosNegocio: action.payload,
      };

    case PRODUCTOS_NEGOCIO_GET_LIST_ERROR:
      return { ...state, loadingPN: true, error: action.payload };

    case PRODUCTOS_CLIENTE_ADD_ITEM:
      return { ...state, loadingPC: false };

    case PRODUCTOS_CLIENTE_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPC: true,
        productosCliente: action.payload,
      };

    case PRODUCTOS_CLIENTE_ADD_ITEM_ERROR:
      return { ...state, loadingPC: true, error: action.payload };

    case PRODUCTOS_NEGOCIO_DELETE_ITEM:
      return { ...state, loadingPN: false };

    case PRODUCTOS_NEGOCIO_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loadingPN: true,
        productosNegocio: action.payload,
      };

    case PRODUCTOS_NEGOCIO_DELETE_ITEM_ERROR:
      return { ...state, loadingPN: true, error: action.payload };

    case PRODUCTOS_PROVEEDOR_GET_LIST:
      return { ...state, loadingPP: false };

    case PRODUCTOS_PROVEEDOR_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPP: true,
        productosProveedor: action.payload,
      };

    case PRODUCTOS_PROVEEDOR_GET_LIST_ERROR:
      return { ...state, loadingPP: true, error: action.payload };

    case PRODUCTOS_CLIENTE_DELETE_ITEM:
      return { ...state, loadingPC: false };

    case PRODUCTOS_CLIENTE_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loadingPC: true,
        productosCliente: action.payload,
      };

    case PRODUCTOS_CLIENTE_DELETE_ITEM_ERROR:
      return { ...state, loadingPC: true, error: action.payload };

    case PRODUCTOS_CLIENTE_UPD_ITEM:
      return { ...state, loadingPC: false };

    case PRODUCTOS_CLIENTE_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPC: true,
        productosCliente: action.payload,
      };

    case PRODUCTOS_CLIENTE_UPD_ITEM_ERROR:
      return { ...state, loadingPC: true, error: action.payload };

    case PRODUCTOS_NEGOCIO_GET_LIST_FREE:
      return { ...state, loadingPNL: false };

    case PRODUCTOS_NEGOCIO_GET_LIST_FREE_SUCCESS:
      return {
        ...state,
        loadingPNL: true,
        productosNegocioLibres: action.payload,
      };

    case PRODUCTOS_NEGOCIO_GET_LIST_FREE_ERROR:
      return { ...state, loadingPNL: true, errorPNL: action.payload };

    case PRODUCTOS_ALMACEN_UPD_ITEM:
      return { ...state, loadingPA: false };

    case PRODUCTOS_ALMACEN_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPA: true,
        productosAlmacen: action.payload,
      };

    case PRODUCTOS_ALMACEN_UPD_ITEM_ERROR:
      return { ...state, loadingPA: true, errorPA: action.payload };

    case PRODUCTOS_ALMACEN_DELETE_ITEM:
      return { ...state, loadingPA: false };

    case PRODUCTOS_ALMACEN_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loadingPA: true,
        productosAlmacen: action.payload,
      };

    case PRODUCTOS_ALMACEN_DELETE_ITEM_ERROR:
      return { ...state, loadingPA: true, errorPA: action.payload };

    case PRODUCTOS_NEGOCIO_UPD_ITEM:
      return { ...state, loadingPN: false };

    case PRODUCTOS_NEGOCIO_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPN: true,
        productosNegocio: action.payload,
      };

    case PRODUCTOS_NEGOCIO_UPD_ITEM_ERROR:
      return { ...state, loadingPN: true, error: action.payload };

    case PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM:
      return { ...state, loadingTodos: false };

    case PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM_SUCCESS:
      return {
        ...state,
        loadingTodos: true,
        productosTodos: action.payload,
      };

    case PRODUCTOS_PROVEEDOR_UPD_PRECIO_SKU_ITEM_ERROR:
      return { ...state, loadingTodos: true, error: action.payload };

    case PRODUCTOS_MARCA_GET_LIST:
      return { ...state, loadingPM: false };

    case PRODUCTOS_MARCA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPM: true,
        productosMarca: action.payload,
      };

    case PRODUCTOS_MARCA_GET_LIST_ERROR:
      return { ...state, loadingPM: true, error: action.payload };

    case PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST:
      return { ...state, loadingPNA: false };

    case PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPNA: true,
        productosNoEstanAlmacen: action.payload,
      };

    case PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST_ERROR:
      return { ...state, loadingPNA: true, error: action.payload };

    case PRODUCTOS_ALMACEN_ADD_ITEM:
      return { ...state, loadingPA: false };

    case PRODUCTOS_ALMACEN_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPA: true,
        productosAlmacen: action.payload,
      };

    case PRODUCTOS_ALMACEN_ADD_ITEM_ERROR:
      return { ...state, loadingPA: true, errorPA: action.payload };

    case PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST:
      return { ...state, loadingPNO: false };

    case PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPNO: true,
        productosNoEstanOrden: action.payload,
      };

    case PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST_ERROR:
      return { ...state, loadingPNO: true, error: action.payload };

    case PRODUCTOS_ORDEN_GET_LIST:
      return { ...state, loadingPO: false };

    case PRODUCTOS_ORDEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPO: true,
        productosOrden: action.payload,
      };

    case PRODUCTOS_ORDEN_GET_LIST_ERROR:
      return { ...state, loadingPO: true, error: action.payload };

    case PRODUCTOS_ORDEN_UPD_ITEM:
      return { ...state, loadingPO: false };

    case PRODUCTOS_ORDEN_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPO: true,
        productosOrden: action.payload,
      };

    case PRODUCTOS_ORDEN_UPD_ITEM_ERROR:
      return { ...state, loadingPO: true, error: action.payload };

    case PRODUCTOS_ORDEN_ADD_ITEM:
      return { ...state, loadingPO: false };

    case PRODUCTOS_ORDEN_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loadingPO: true,
        productosOrden: action.payload,
      };

    case PRODUCTOS_ORDEN_ADD_ITEM_ERROR:
      return { ...state, loadingPO: true, error: action.payload };

    case PRODUCTOS_CATEGORIA_GET_LIST:
      return { ...state, loadingPCAT: false };

    case PRODUCTOS_CATEGORIA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPCAT: true,
        productosCategoria: action.payload,
      };

    case PRODUCTOS_CATEGORIA_GET_LIST_ERROR:
      return { ...state, loadingPCAT: true, error: action.payload };

    case PRODUCTOS_ALMACEN_VENTA_GET_LIST:
      return { ...state, loadingPAV: false };

    case PRODUCTOS_ALMACEN_VENTA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPAV: true,
        productosAlmacenVenta: action.payload,
      };

    case PRODUCTOS_ALMACEN_VENTA_GET_LIST_ERROR:
      return { ...state, loadingPAV: true, errorPAV: action.payload };

    case PRODUCTOS_ORDEN_VENTA_GET_LIST:
      return { ...state, loadingPOV: false };

    case PRODUCTOS_ORDEN_VENTA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPOV: true,
        productosOrdenVenta: action.payload,
      };

    case PRODUCTOS_ORDEN_VENTA_GET_LIST_ERROR:
      return { ...state, loadingPOV: true, errorPOV: action.payload };

    case PRODUCTOS_MEJOR_VENDIDOS_GET_LIST:
      return { ...state, loadingPMV: false };

    case PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPMV: true,
        productosMejorVendidos: action.payload,
      };

    case PRODUCTOS_MEJOR_VENDIDOS_GET_LIST_ERROR:
      return { ...state, loadingPMV: true, errorPMV: action.payload };

    default:
      return { ...state };
  }
};
