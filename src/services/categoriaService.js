import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) =>
  API.put(`${URI.CATEGORIAS}/${item.idCategoria}`, item);
const crea = (item) => API.post(URI.CATEGORIAS, item);
const subirFoto = (item) => API.post(`${URI.CATEGORIAS}/uploadphoto`, item);

const categoria = {
  actualiza,
  crea,
  subirFoto,
};

export default categoria;
