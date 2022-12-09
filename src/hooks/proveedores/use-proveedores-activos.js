import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useProveedoresActivos = (auth) => {
  const URL = auth ? `${URI.PROVEEDORES}/activos` : null;
  const { data: proveedoresActivos, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !proveedoresActivos && !error;

  return { proveedoresActivos, isLoading, mutate };
};

export default useProveedoresActivos;
