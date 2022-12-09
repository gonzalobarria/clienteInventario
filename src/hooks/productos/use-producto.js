import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useProducto = (idProducto) => {
  const URL = idProducto ? `${URI.PRODUCTOS}/${idProducto}` : null;
  const { data: producto, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !producto && !error;

  return { producto, isLoading, mutate };
};

export default useProducto;
