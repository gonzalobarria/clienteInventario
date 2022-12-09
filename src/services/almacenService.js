import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) => API.put(`${URI.ALMACENES}/${item.idAlmacen}`, item);

const agregaProducto = (item) =>
  API.post(`${URI.ALMACENES}/${item.idAlmacen}/productos`, item);

const actualizaProducto = (item) =>
  API.patch(`${URI.ALMACENES}/${item.idAlmacen}/productos`, item);

const crea = (item) => API.post(URI.ALMACENES, item);
const eliminaProducto = (item) =>
  API.patch(`${URI.ALMACENES}/${item.idAlmacen}/productos`, item);

const subirFoto = (item) => API.post(`${URI.ALMACENES}/uploadphoto`, item);

const almacen = {
  actualiza,
  agregaProducto,
  actualizaProducto,
  crea,
  eliminaProducto,
  subirFoto,
};

export default almacen;
