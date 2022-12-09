import {
  CLIENTE_GET_DETAILS,
  CLIENTE_GET_DETAILS_SUCCESS,
  CLIENTE_GET_DETAILS_ERROR,
  CLIENTE_ADD_PHOTO,
  CLIENTE_ADD_PHOTO_SUCCESS,
  CLIENTE_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  cliente: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CLIENTE_GET_DETAILS:
      return { ...state, loading: false };

    case CLIENTE_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        cliente: action.payload,
      };

    case CLIENTE_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CLIENTE_ADD_PHOTO:
      return { ...state, loading: false };

    case CLIENTE_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        cliente: action.payload,
      };

    case CLIENTE_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
