import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useProductosVoucher = (idOrdenVenta) => {
  const URL = idOrdenVenta
    ? `${URI.ORDENES_VENTA}/${idOrdenVenta}/productos/voucher`
    : null;
  const { data: productosVoucher, error } = useSWR(URL);
  useError(error);

  const isLoading = !productosVoucher && !error;

  return { productosVoucher, isLoading };
};

export default useProductosVoucher;
