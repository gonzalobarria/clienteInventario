import {
  PROVEEDOR_GET_DETAILS,
  PROVEEDOR_GET_DETAILS_SUCCESS,
  PROVEEDOR_GET_DETAILS_ERROR,
  PROVEEDOR_ADD_PHOTO,
  PROVEEDOR_ADD_PHOTO_SUCCESS,
  PROVEEDOR_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  proveedor: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROVEEDOR_GET_DETAILS:
      return { ...state, loading: false };

    case PROVEEDOR_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        proveedor: action.payload,
      };

    case PROVEEDOR_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PROVEEDOR_ADD_PHOTO:
      return { ...state, loading: false };

    case PROVEEDOR_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        proveedor: action.payload,
      };

    case PROVEEDOR_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
