import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useUsuariosOrden = (auth) => {
  const URL = auth ? `${URI.USUARIOS}/orden` : null;
  const { data: usuariosOrden, error } = useSWR(URL);
  useError(error);

  const isLoading = !usuariosOrden && !error;

  return { usuariosOrden, isLoading };
};

export default useUsuariosOrden;
