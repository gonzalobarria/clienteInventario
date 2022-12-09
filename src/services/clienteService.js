import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) => API.put(`${URI.CLIENTES}/${item.idCliente}`, item);

const actualizaProducto = (item) =>
  API.patch(`${URI.CLIENTES}/${item.idCliente}/productos`, item);

const agregaProducto = (item) =>
  API.post(`${URI.CLIENTES}/${item.idCliente}/productos`, item);

const crea = (item) => API.post(URI.CLIENTES, item);

const creaAsignaProducto = (item) => actualizaProducto(item);

const eliminaProducto = (item) => actualizaProducto(item);

const subirFoto = (item) => API.post(`${URI.CLIENTES}/uploadphoto`, item);

const cliente = {
  actualiza,
  actualizaProducto,
  agregaProducto,
  crea,
  creaAsignaProducto,
  eliminaProducto,
  subirFoto,
};

export default cliente;
