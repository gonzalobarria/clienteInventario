import useSWR from 'swr';
import { URI } from '../../constants/enums';
import almacenService from '../../services/almacenService';
import useError from '../use-error';

const useAlmacen = (idAlmacen) => {
  const URL = idAlmacen ? `${URI.ALMACENES}/${idAlmacen}` : null;
  const { data: almacen, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !almacen && !error;

  const subirFoto = async (item) => {
    await almacenService.subirFoto(item);
    mutate();
  };

  return { almacen, isLoading, subirFoto };
};

export default useAlmacen;
