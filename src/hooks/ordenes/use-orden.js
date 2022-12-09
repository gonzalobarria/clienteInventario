import useSWR from 'swr';
import { URI } from '../../constants/enums';
import ordenService from '../../services/ordenService';
import useError from '../use-error';

const useOrden = (idOrden) => {
  const URL = idOrden ? `${URI.ORDENES}/${idOrden}` : null;
  const { data: orden, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !orden && !error;

  const subirFoto = async (item) => {
    await ordenService.subirFoto(item);
    mutate();
  };

  return { orden, isLoading, subirFoto, mutate };
};

export default useOrden;
