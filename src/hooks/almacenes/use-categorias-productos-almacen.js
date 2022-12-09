import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useCategoriasProductosAlmacen = (idAlmacen) => {
  const URL = idAlmacen ? `${URI.ALMACENES}/${idAlmacen}/categorias` : null;
  const { data: categorias, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !categorias && !error;

  return { categorias, isLoading, mutate };
};

export default useCategoriasProductosAlmacen;
