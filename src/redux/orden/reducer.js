import {
  ORDEN_GET_DETAILS,
  ORDEN_GET_DETAILS_SUCCESS,
  ORDEN_GET_DETAILS_ERROR,
  ORDEN_ADD_PHOTO,
  ORDEN_ADD_PHOTO_SUCCESS,
  ORDEN_ADD_PHOTO_ERROR,
  ORDEN_PRODUCTO_ADD_PHOTO,
  ORDEN_PRODUCTO_ADD_PHOTO_SUCCESS,
  ORDEN_PRODUCTO_ADD_PHOTO_ERROR,
  ORDEN_UPD_ESTADO,
  ORDEN_UPD_ESTADO_SUCCESS,
  ORDEN_UPD_ESTADO_ERROR,
} from '../actions';

const INIT_STATE = {
  orden: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORDEN_GET_DETAILS:
      return { ...state, loading: false };

    case ORDEN_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        orden: action.payload,
      };

    case ORDEN_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDEN_ADD_PHOTO:
      return { ...state, loading: false };

    case ORDEN_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        orden: action.payload,
      };

    case ORDEN_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDEN_PRODUCTO_ADD_PHOTO:
      return { ...state, loading: false };

    case ORDEN_PRODUCTO_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        orden: action.payload,
      };

    case ORDEN_PRODUCTO_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDEN_UPD_ESTADO:
      return { ...state, loading: false };

    case ORDEN_UPD_ESTADO_SUCCESS:
      return {
        ...state,
        loading: true,
        orden: action.payload,
      };

    case ORDEN_UPD_ESTADO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
