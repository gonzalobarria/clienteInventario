import {
  CATEGORIAS_GET_LIST,
  CATEGORIAS_GET_LIST_SUCCESS,
  CATEGORIAS_GET_LIST_ERROR,
  CATEGORIAS_ADD_ITEM,
  CATEGORIAS_ADD_ITEM_SUCCESS,
  CATEGORIAS_ADD_ITEM_ERROR,
  CATEGORIAS_UPD_ITEM,
  CATEGORIAS_UPD_ITEM_SUCCESS,
  CATEGORIAS_UPD_ITEM_ERROR,
  CATEGORIAS_ACTIVAS_GET_LIST,
  CATEGORIAS_ACTIVAS_GET_LIST_SUCCESS,
  CATEGORIAS_ACTIVAS_GET_LIST_ERROR,
  CATEGORIAS_TODAS_GET_LIST,
  CATEGORIAS_TODAS_GET_LIST_SUCCESS,
  CATEGORIAS_TODAS_GET_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  categorias: null,
  categoriasActivas: null,
  categoriasTodas: null,
  error: '',
  loading: false,
  loadingCA: false,
  loadingCT: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORIAS_GET_LIST:
      return { ...state, loading: false };

    case CATEGORIAS_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        categorias: action.payload,
      };

    case CATEGORIAS_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CATEGORIAS_ADD_ITEM:
      return { ...state, loading: false };

    case CATEGORIAS_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        categorias: action.payload,
      };

    case CATEGORIAS_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CATEGORIAS_UPD_ITEM:
      return { ...state, loading: false };

    case CATEGORIAS_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        categorias: action.payload,
      };

    case CATEGORIAS_UPD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CATEGORIAS_ACTIVAS_GET_LIST:
      return { ...state, loadingCA: false };

    case CATEGORIAS_ACTIVAS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingCA: true,
        categoriasActivas: action.payload,
      };

    case CATEGORIAS_ACTIVAS_GET_LIST_ERROR:
      return { ...state, loadingCA: true, error: action.payload };

    case CATEGORIAS_TODAS_GET_LIST:
      return { ...state, loadingCT: false };

    case CATEGORIAS_TODAS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingCT: true,
        categoriasTodas: action.payload,
      };

    case CATEGORIAS_TODAS_GET_LIST_ERROR:
      return { ...state, loadingCT: true, error: action.payload };

    default:
      return { ...state };
  }
};
