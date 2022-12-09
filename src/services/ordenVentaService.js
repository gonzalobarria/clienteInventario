import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const crea = (item) => API.post(URI.ORDENES_VENTA, item);

const ordenVenta = {
  crea,
};

export default ordenVenta;
