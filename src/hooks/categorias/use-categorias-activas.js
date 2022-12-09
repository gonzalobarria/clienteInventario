import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useCategoriasActivas = (auth) => {
  const URL = auth ? `${URI.CATEGORIAS}/activas` : null;
  const { data: categorias, error } = useSWR(URL);
  useError(error);

  const isLoading = !error && !categorias;

  return { categorias, isLoading };
};

export default useCategoriasActivas;
