import useSWR from 'swr';
import { URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import useError from '../use-error';

const useOrdenesProducto = (params) => {
  const URL = params.loadOP
    ? `${URI.PRODUCTOS}/${params.idProducto}/ordenes${getStrQuery(params)}`
    : null;
  const { data: ordenesProducto, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !ordenesProducto && !error;

  return { ordenesProducto, isLoading, mutate };
};

export default useOrdenesProducto;
