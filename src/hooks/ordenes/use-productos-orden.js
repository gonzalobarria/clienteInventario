import useSWR from 'swr';
import { URI } from '../../constants/enums';
import ordenService from '../../services/ordenService';
import useError from '../use-error';

const useProductosOrden = (idOrden) => {
  const URL = idOrden ? `${URI.ORDENES}/${idOrden}/productos` : null;
  const { data: productosOrden, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !productosOrden && !error;

  const subirFotoProducto = async (item) => {
    await ordenService.subirFotoProducto(item);
    mutate();
  };

  return { productosOrden, isLoading, mutate, subirFotoProducto };
};

export default useProductosOrden;
