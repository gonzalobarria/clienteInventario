/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-catch */
import Resizer from 'react-image-file-resizer';
import momentTz from 'moment-timezone';
import 'moment/locale/es';
import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
  TIMEZONE,
  darkDefaultColor,
} from '../constants/defaultValues';
// eslint-disable-next-line import/no-cycle
import { Funcionalidades } from './authHelper';
import { ESTADOS_BOOLEAN } from '../constants/enums';

export const mapOrder = (array, order, key) => {
  array.sort((a, b) => {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) currentColor = darkDefaultColor;

    if (localStorage.getItem(themeColorStorageKey))
      currentColor = localStorage.getItem(themeColorStorageKey);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem('currentLanguage')
      ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

// TODO: pensar en traer funcionalidades del usuario cada vez que se traiga el refreshtoken
export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('current_user') !== null
        ? JSON.parse(localStorage.getItem('current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
      localStorage.removeItem('auth-token');
      localStorage.removeItem('datos');
      localStorage.removeItem('refresh-auth-token');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const checkFuncionalidades = (funcionalidades) => {
  const usuario = getCurrentUser();
  const ADMIN = [
    Funcionalidades.Control_Total_de_la_Plataforma,
    Funcionalidades.Control_Total_del_Negocio,
  ];

  return funcionalidades.some(
    (func) =>
      usuario.funcionalidades.includes(func) ||
      usuario.funcionalidades.some((f) => ADMIN.includes(f))
  );
};

export const isAdmin = () =>
  checkFuncionalidades([Funcionalidades.Control_Total_del_Negocio]);

export const getAlmacenActivo = () => {
  const usuario = getCurrentUser();

  if (checkFuncionalidades([Funcionalidades.Agregar_Orden_Venta])) {
    return usuario.almacenes.filter(
      (a) => a.func === Funcionalidades.Agregar_Orden_Venta
    );
  }

  return [];
};

export const preValidation = (funcionalidades) => {
  try {
    if (!checkFuncionalidades(funcionalidades))
      throw new Error('error.no-autorizado');
  } catch (error) {
    throw error;
  }
};

export const jsonToArray = (json) => {
  const salida = [];
  let tmp = {};

  for (const i in json) {
    tmp.value = json[i];
    tmp.label = i[0].toUpperCase() + i.slice(1).toLowerCase();
    salida.push(tmp);
    tmp = {};
  }
  return salida;
};

export const getImagen = (imgURL) =>
  imgURL || process.env.REACT_APP_IMG_DEFAULT;

export const priceFormat = (value) => {
  if (value) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(value);
  }
  return '$0';
};

export const numberFormat = (value) => {
  if (Number.isNaN(value)) return 0;
  if (value) {
    return new Intl.NumberFormat('es-CL').format(value);
  }
  return 0;
};

export const convertToNumber = (value) => {
  if (Number.isNaN(value * 1)) return 0;
  return value;
};

export const getArrayOfDays = (isMS = false) => {
  const days = [];
  let day = momentTz().tz(TIMEZONE).subtract(6, 'd').startOf('day');

  const today = momentTz().tz(TIMEZONE).toDate();

  while (day <= today) {
    day.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    if (isMS) days.push(day.format('YYYY-MM-DD'));
    else days.push(day.format('DD-MMM').replace('.', ''));

    day = day.clone().add(1, 'd');
  }
  return days;
};

export const getMinMax = (valor, isMin = false) => {
  const closeTo5 = (x) => Math.floor(x / 5) * 5;
  const param = 10;
  if (isMin) return valor - param < 0 ? 0 : closeTo5(valor - param);

  return valor + param > 100 ? 100 : closeTo5(valor + param);
};

export const addEmpty = (glosa, arr) => [{ id: '', glosa }, ...arr];

export const getQuery = (query, paramQuery, value) => {
  let qry = query;
  if (value) {
    qry += query.length > 0 ? '&' : '?';
    qry += `${paramQuery}=${value}`;
  }
  return qry;
};

export const getStrQuery = (params) => {
  let query = '';
  query = getQuery(query, 'currentPage', params?.currentPage);
  query = getQuery(query, 'pageSize', params?.pageSize);
  query = getQuery(query, 'orderBy', params?.orderBy?.id);
  query = getQuery(query, 'search', params?.search);
  query = getQuery(query, 'category', params?.category);

  return query;
};

export const getSelectValue = (item) => item?.value ?? item;
export const getSelectLabel = (item) => item?.label ?? item;

export const comboConvert = (item) => ({ value: item.id, label: item.glosa });

export const onWheel = (e) => e.target.blur();

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 800, 800, 'JPEG', 75, 0, resolve, 'base64');
  });

export const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export const estadosArr = jsonToArray(ESTADOS_BOOLEAN);
