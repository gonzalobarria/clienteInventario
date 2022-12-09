import { URI } from '../constants/enums';
import { API } from '../helpers/axios';

const actualiza = (item) => API.put(`${URI.MARCAS}/${item.idMarca}`, item);
const crea = (item) => API.post(URI.MARCAS, item);
const subirFoto = (item) => API.post(`${URI.MARCAS}/uploadphoto`, item);

const marca = {
  actualiza,
  crea,
  subirFoto,
};

export default marca;
