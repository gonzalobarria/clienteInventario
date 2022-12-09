/* eslint-disable no-useless-catch */
import jwtDecode from 'jwt-decode';

import { API } from '../helpers/axios';
import deviceStorage from '../helpers/deviceStorage';

const DATOS_KEY = 'datos';

const login = async (formValues) => {
  try {
    const { data } = await API.post('/api/auth/login', formValues);

    deviceStorage.saveJWT(data);
    // deviceStorage.saveKey(DATOS_KEY, JSON.stringify(data[DATOS_KEY]));

    const usuarioToken = jwtDecode(data.token);
    return usuarioToken;
  } catch (error) {
    throw error;
  }
};

const registro = async (formValues) => {
  try {
    const { data } = await API.post('/api/auth/registro', formValues);
    const myJWT = data;

    deviceStorage.saveJWT(myJWT);

    const usuarioToken = jwtDecode(myJWT);

    return usuarioToken;
  } catch (error) {
    throw error;
  }
};

const facebookLogin = async (user) => {
  if (user.isCancelled) return false;

  try {
    const { accessToken } = user;

    const { data } = await API.get(
      `/api/auth/facebook/token?access_token=${accessToken}`
    );

    const myJWT = data;

    deviceStorage.saveJWT(myJWT);

    const usuarioToken = jwtDecode(myJWT);
    const misDatos = {
      nombre: user.first_name,
      apPaterno: user.last_name,
      apMaterno: null,
      imgURL: user.picture.data.url,
    };
    deviceStorage.saveKey(DATOS_KEY, JSON.stringify(misDatos));
    return usuarioToken;
  } catch (error) {
    throw error;
  }
};

const googleLogin = async (user) => {
  try {
    const { tokenId, profileObj } = user;

    const { data } = await API.post('/api/auth/google/token', {
      idToken: tokenId,
    });

    const myJWT = data;

    deviceStorage.saveJWT(myJWT);

    const usuarioToken = jwtDecode(myJWT);

    const misDatos = {
      nombre: profileObj.givenName,
      apPaterno: profileObj.familyName,
      apMaterno: null,
      imgURL: profileObj.imageUrl,
    };
    deviceStorage.saveKey(DATOS_KEY, JSON.stringify(misDatos));

    return usuarioToken;
  } catch (error) {
    throw error;
  }
};

const authService = {
  login,
  facebookLogin,
  googleLogin,
  registro,
};

export default authService;
