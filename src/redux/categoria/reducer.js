import {
  CATEGORIA_GET_DETAILS,
  CATEGORIA_GET_DETAILS_SUCCESS,
  CATEGORIA_GET_DETAILS_ERROR,
  CATEGORIA_ADD_PHOTO,
  CATEGORIA_ADD_PHOTO_SUCCESS,
  CATEGORIA_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  categoria: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORIA_GET_DETAILS:
      return { ...state, loading: false };

    case CATEGORIA_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        categoria: action.payload,
      };

    case CATEGORIA_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CATEGORIA_ADD_PHOTO:
      return { ...state, loading: false };

    case CATEGORIA_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        categoria: action.payload,
      };

    case CATEGORIA_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
