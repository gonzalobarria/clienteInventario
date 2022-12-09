import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) =>
  API.put(`${URI.PROVEEDORES}/${item.idProveedor}`, item);
const crea = (item) => API.post(URI.PROVEEDORES, item);
const subirFoto = (item) => API.post(`${URI.PROVEEDORES}/uploadphoto`, item);

const proveedor = {
  actualiza,
  crea,
  subirFoto,
};

export default proveedor;
