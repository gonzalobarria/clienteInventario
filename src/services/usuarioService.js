import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) => API.put(`${URI.USUARIOS}/${item.idUsuario}`, item);
const crea = (item) => API.post(URI.USUARIOS, item);
const subirFoto = (item) => API.post(`${URI.USUARIOS}/uploadphoto`, item);

const usuario = {
  actualiza,
  crea,
  subirFoto,
};

export default usuario;
