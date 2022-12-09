import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useProductosActivosOrden = (auth) => {
  const URL = auth ? `${URI.PRODUCTOS}/activos-orden` : null;
  const { data: productosActivosOrden, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !productosActivosOrden && !error;

  return { productosActivosOrden, isLoading, mutate };
};

export default useProductosActivosOrden;
