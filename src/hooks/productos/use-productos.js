import useSWR from 'swr';
import { URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import useError from '../use-error';

const useProductos = (params) => {
  const URL = `${URI.PRODUCTOS}${getStrQuery(params)}`;
  const { data: productos, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !productos && !error;

  return { productos, isLoading, mutate };
};

export default useProductos;
