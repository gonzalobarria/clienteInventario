import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useNoAlmacenesProducto = (idProducto) => {
  const URL = idProducto
    ? `${URI.PRODUCTOS}/${idProducto}/almacenes/faltantes`
    : null;
  const { data: noAlmacenesProducto, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !noAlmacenesProducto && !error;

  return { noAlmacenesProducto, isLoading, mutate };
};

export default useNoAlmacenesProducto;
