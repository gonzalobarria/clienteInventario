import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useProductosOrdenVenta = (idOrdenVenta) => {
  const URL = idOrdenVenta
    ? `${URI.ORDENES_VENTA}/${idOrdenVenta}/productos`
    : null;
  const { data: productosOrdenVenta, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !productosOrdenVenta && !error;

  return { productosOrdenVenta, isLoading, mutate };
};

export default useProductosOrdenVenta;
