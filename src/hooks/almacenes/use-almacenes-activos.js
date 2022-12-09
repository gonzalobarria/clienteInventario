import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useAlmacenesActivos = (auth) => {
  const URL = auth ? `${URI.ALMACENES}/activos` : null;
  const { data: almacenesActivos, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !almacenesActivos && !error;

  return { almacenesActivos, isLoading, mutate };
};

export default useAlmacenesActivos;
