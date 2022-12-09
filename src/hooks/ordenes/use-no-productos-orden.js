import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useNoProductosOrden = (idOrden, auth) => {
  const URL = auth ? `${URI.ORDENES}/${idOrden}/productos/faltantes` : null;
  const { data: noProductosOrden, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !noProductosOrden && !error;

  return { noProductosOrden, isLoading, mutate };
};

export default useNoProductosOrden;
