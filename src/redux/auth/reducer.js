import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  CHECK_CODE,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_ERROR,
} from '../actions';
import { getCurrentUser } from '../../helpers/Utils';

const INIT_STATE = {
  currentUser: getCurrentUser(),
  forgotUserMail: '',
  checkCodeResponse: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  loadingFP: false,
  loadingCC: false,
  loadingRP: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loadingFP: false, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingFP: true,
        forgotUserMail: action.payload,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loadingFP: true,
        error: action.payload.message,
      };

    case CHECK_CODE:
      return { ...state, loadingCC: false, error: '' };
    case CHECK_CODE_SUCCESS:
      return {
        ...state,
        loadingCC: true,
        checkCodeResponse: action.payload,
      };
    case CHECK_CODE_ERROR:
      return {
        ...state,
        loadingCC: true,
        error: action.payload.message,
      };

    case RESET_PASSWORD:
      return { ...state, loadingRP: false };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loadingRP: true, newPassword: action.payload };
    case RESET_PASSWORD_ERROR:
      return { ...state, loadingRP: true, error: action.payload };

    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    case LOGIN_FACEBOOK:
      return { ...state, loading: true, error: '' };
    case LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.id,
        error: '',
      };
    case LOGIN_FACEBOOK_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: '',
        error: action.payload.message,
      };
    case LOGIN_GOOGLE:
      return { ...state, loading: true, error: '' };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.id,
        error: '',
      };
    case LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: '',
        error: action.payload.message,
      };
    default:
      return { ...state };
  }
};
