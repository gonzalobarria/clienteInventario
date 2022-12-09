import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useNoProductosAlmacen = (idAlmacen, auth) => {
  const URL = auth ? `${URI.ALMACENES}/${idAlmacen}/productos/faltantes` : null;
  const { data: noProductosAlmacen, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !noProductosAlmacen && !error;

  return { noProductosAlmacen, isLoading, mutate };
};

export default useNoProductosAlmacen;
