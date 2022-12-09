import useSWR from 'swr';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useMarcasActivas = (auth) => {
  const URL = auth ? `${URI.MARCAS}/activas` : null;
  const { data: marcas, error } = useSWR(URL);
  useError(error);

  const isLoading = !error && !marcas;

  return { marcas, isLoading };
};

export default useMarcasActivas;
