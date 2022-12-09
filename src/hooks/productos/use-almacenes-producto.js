import useSWR from 'swr';
import { URI } from '../../constants/enums';
import producto from '../../services/productoService';
import useError from '../use-error';

const useAlmacenesProducto = (idProducto) => {
  const URL = idProducto ? `${URI.PRODUCTOS}/${idProducto}/almacenes` : null;
  const { data: almacenesProducto, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !almacenesProducto && !error;

  const agregaAlmacen = async (payload) => {
    await producto.agregaAlmacen(payload);
    mutate();
  };

  return { almacenesProducto, isLoading, mutate, agregaAlmacen };
};

export default useAlmacenesProducto;
