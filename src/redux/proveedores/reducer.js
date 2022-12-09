import {
  PROVEEDORES_GET_LIST,
  PROVEEDORES_GET_LIST_SUCCESS,
  PROVEEDORES_GET_LIST_ERROR,
  PROVEEDORES_ADD_ITEM,
  PROVEEDORES_ADD_ITEM_SUCCESS,
  PROVEEDORES_ADD_ITEM_ERROR,
  PROVEEDORES_ACTIVOS_GET_LIST,
  PROVEEDORES_ACTIVOS_GET_LIST_SUCCESS,
  PROVEEDORES_ACTIVOS_GET_LIST_ERROR,
  PROVEEDORES_UPD_ITEM,
  PROVEEDORES_UPD_ITEM_SUCCESS,
  PROVEEDORES_UPD_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  proveedores: null,
  proveedoresActivos: null,
  error: '',
  errorPA: '',
  loading: false,
  loadingPA: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROVEEDORES_GET_LIST:
      return { ...state, loading: false };

    case PROVEEDORES_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        proveedores: action.payload,
      };

    case PROVEEDORES_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PROVEEDORES_ACTIVOS_GET_LIST:
      return { ...state, loadingPA: false };

    case PROVEEDORES_ACTIVOS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingPA: true,
        proveedoresActivos: action.payload,
      };

    case PROVEEDORES_ACTIVOS_GET_LIST_ERROR:
      return { ...state, loadingPA: true, errorPA: action.payload };

    case PROVEEDORES_ADD_ITEM:
      return { ...state, loading: false };

    case PROVEEDORES_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        proveedores: action.payload,
      };

    case PROVEEDORES_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PROVEEDORES_UPD_ITEM:
      return { ...state, loading: false };

    case PROVEEDORES_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        proveedores: action.payload,
      };

    case PROVEEDORES_UPD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
