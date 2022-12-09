import {
  MARCA_GET_DETAILS,
  MARCA_GET_DETAILS_SUCCESS,
  MARCA_GET_DETAILS_ERROR,
  MARCA_ADD_PHOTO,
  MARCA_ADD_PHOTO_SUCCESS,
  MARCA_ADD_PHOTO_ERROR,
} from '../actions';

const INIT_STATE = {
  marca: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MARCA_GET_DETAILS:
      return { ...state, loading: false };

    case MARCA_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        marca: action.payload,
      };

    case MARCA_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    case MARCA_ADD_PHOTO:
      return { ...state, loading: false };

    case MARCA_ADD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: true,
        marca: action.payload,
      };

    case MARCA_ADD_PHOTO_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
