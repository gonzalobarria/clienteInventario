import {
  PRODUCTO_GET_DETAILS,
  PRODUCTO_GET_DETAILS_SUCCESS,
  PRODUCTO_GET_DETAILS_ERROR,
  PRODUCTO_NEGOCIO_GET_DETAILS,
  PRODUCTO_NEGOCIO_GET_DETAILS_SUCCESS,
  PRODUCTO_NEGOCIO_GET_DETAILS_ERROR,
  PRODUCTO_ADD_PHOTO,
  PRODUCTO_ADD_PHOTO_SUCCESS,
  PRODUCTO_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  producto: null,
  productoNegocio: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCTO_GET_DETAILS:
      return { ...state, loading: false };

    case PRODUCTO_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        producto: action.payload,
      };

    case PRODUCTO_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PRODUCTO_NEGOCIO_GET_DETAILS:
      return { ...state, loading: false };

    case PRODUCTO_NEGOCIO_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        producto: action.payload,
        productoNegocio: action.payload,
      };

    case PRODUCTO_NEGOCIO_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PRODUCTO_ADD_PHOTO:
      return { ...state, loading: false };

    case PRODUCTO_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        producto: action.payload,
      };

    case PRODUCTO_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
