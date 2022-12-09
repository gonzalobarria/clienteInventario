import {
  MARCAS_GET_LIST,
  MARCAS_GET_LIST_SUCCESS,
  MARCAS_GET_LIST_ERROR,
  MARCAS_ADD_ITEM,
  MARCAS_ADD_ITEM_SUCCESS,
  MARCAS_ADD_ITEM_ERROR,
  MARCAS_UPD_ITEM,
  MARCAS_UPD_ITEM_SUCCESS,
  MARCAS_UPD_ITEM_ERROR,
  MARCAS_ACTIVAS_GET_LIST,
  MARCAS_ACTIVAS_GET_LIST_SUCCESS,
  MARCAS_ACTIVAS_GET_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  marcas: null,
  marcasActivas: null,
  error: '',
  loading: false,
  loadingMA: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MARCAS_GET_LIST:
      return { ...state, loading: false };

    case MARCAS_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        marcas: action.payload,
      };

    case MARCAS_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case MARCAS_ADD_ITEM:
      return { ...state, loading: false };

    case MARCAS_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        marcas: action.payload,
      };

    case MARCAS_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case MARCAS_UPD_ITEM:
      return { ...state, loading: false };

    case MARCAS_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        marcas: action.payload,
      };

    case MARCAS_UPD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case MARCAS_ACTIVAS_GET_LIST:
      return { ...state, loadingMA: false };

    case MARCAS_ACTIVAS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingMA: true,
        marcasActivas: action.payload,
      };

    case MARCAS_ACTIVAS_GET_LIST_ERROR:
      return { ...state, loadingMA: true, error: action.payload };

    default:
      return { ...state };
  }
};
