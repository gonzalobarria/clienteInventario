import useSWR from 'swr';
import { TIPOS_ALMACEN, URI } from '../../constants/enums';
import useError from '../use-error';

const useProductosBajoStock = (local) => {
  const URL = `${URI.PRODUCTOS}/bajo-stock`;
  const { data, error } = useSWR(URL);
  useError(error);

  const isLoading = !data && !error;

  const productosBajoStock =
    !isLoading &&
    data.filter((p) =>
      local
        ? p.id_tipo_almacen === TIPOS_ALMACEN.LOCAL
        : p.id_tipo_almacen === TIPOS_ALMACEN.BODEGA
    );

  return { productosBajoStock, isLoading };
};

export default useProductosBajoStock;
