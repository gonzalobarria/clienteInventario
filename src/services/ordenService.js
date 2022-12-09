import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualizaUsuario = (item) =>
  API.patch(`${URI.ORDENES}/usuarioreceptor`, item);

const crea = (item) => API.post(URI.ORDENES, item);
const subirFoto = (item) => API.post(`${URI.ORDENES}/uploadphoto`, item);
const subirFotoProducto = (item) =>
  API.post(`${URI.ORDENES}/producto/uploadphoto`, item);

const orden = {
  actualizaUsuario,
  crea,
  subirFoto,
  subirFotoProducto,
};

export default orden;
