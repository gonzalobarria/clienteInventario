import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const subirFoto = (item) => API.post(`${URI.PRODUCTOS}/uploadphoto`, item);

const crea = (item) => API.post(URI.PRODUCTOS, item);

const actualiza = (item) =>
  API.put(`${URI.PRODUCTOS}/${item.idProducto}`, item);

const agregaAlmacen = (item) =>
  API.post(`${URI.PRODUCTOS}/${item.idProducto}/almacenes`, item);

const producto = {
  actualiza,
  agregaAlmacen,
  crea,
  subirFoto,
};

export default producto;
