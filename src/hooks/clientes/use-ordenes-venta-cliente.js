import useSWR from 'swr';
import { URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import useError from '../use-error';

const useOrdenesVentaCliente = (params) => {
  const URL = params.idCliente
    ? `${URI.CLIENTES}/${params.idCliente}/ordenes-venta${getStrQuery(params)}`
    : null;
  const { data: ordenesVentaCliente, error } = useSWR(URL);
  useError(error);

  const isLoading = !ordenesVentaCliente && !error;

  return { ordenesVentaCliente, isLoading };
};

export default useOrdenesVentaCliente;
