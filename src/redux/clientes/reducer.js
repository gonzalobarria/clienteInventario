import {
  CLIENTES_GET_LIST,
  CLIENTES_GET_LIST_SUCCESS,
  CLIENTES_GET_LIST_ERROR,
  CLIENTES_ADD_ITEM,
  CLIENTES_ADD_ITEM_SUCCESS,
  CLIENTES_ADD_ITEM_ERROR,
  CLIENTES_UPD_ITEM,
  CLIENTES_UPD_ITEM_SUCCESS,
  CLIENTES_UPD_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  clientes: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CLIENTES_GET_LIST:
      return { ...state, loading: false };

    case CLIENTES_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        clientes: action.payload,
      };

    case CLIENTES_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CLIENTES_ADD_ITEM:
      return { ...state, loading: false };

    case CLIENTES_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        clientes: action.payload,
      };

    case CLIENTES_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CLIENTES_UPD_ITEM:
      return { ...state, loading: false };

    case CLIENTES_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        clientes: action.payload,
      };

    case CLIENTES_UPD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
