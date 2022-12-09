/* eslint-disable no-useless-catch */
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-auth-token';

const deviceStorage = {
  saveKey(key, valueToSave) {
    try {
      localStorage.setItem(key, valueToSave);
    } catch (error) {
      throw error;
    }
  },

  loadKey(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      throw error;
    }
  },

  loadJWT() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      throw error;
    }
  },

  saveJWT(valueToSave) {
    try {
      this.saveKey(REFRESH_TOKEN_KEY, valueToSave.refreshToken);
      this.saveKey(TOKEN_KEY, valueToSave.token);
    } catch (error) {
      throw error;
    }
  },

  deleteJWT() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      throw error;
    }
  },
};

export default deviceStorage;
