import {
  USUARIO_GET_DETAILS,
  USUARIO_GET_DETAILS_SUCCESS,
  USUARIO_GET_DETAILS_ERROR,
  USUARIO_ADD_PHOTO,
  USUARIO_ADD_PHOTO_SUCCESS,
  USUARIO_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  usuario: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USUARIO_GET_DETAILS:
      return { ...state, loading: false };

    case USUARIO_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        usuario: action.payload,
      };

    case USUARIO_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case USUARIO_ADD_PHOTO:
      return { ...state, loading: false };

    case USUARIO_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        usuario: action.payload,
      };

    case USUARIO_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
