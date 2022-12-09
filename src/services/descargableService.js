import { URI } from '../constants/enums';
import { API } from '../helpers/axios';
import { getQuery } from '../helpers/Utils';

export const getStrQuery = (params) => {
  let query = '';
  query = getQuery(query, 'idMarca', params?.idMarca);
  query = getQuery(query, 'idCategoria', params?.idCategoria);

  return query;
};

const getProductosPDF = (payload) =>
  API.get(URI.DESCARGABLES + getStrQuery(payload));
const getOrdenPDF = (idOrden) =>
  API.get(`${URI.DESCARGABLES}/orden/${idOrden}`);
const getOrdenVentaPDF = (idOV) =>
  API.get(`${URI.DESCARGABLES}/orden-venta/${idOV}`);

const descargable = {
  getOrdenPDF,
  getOrdenVentaPDF,
  getProductosPDF,
};

export default descargable;
