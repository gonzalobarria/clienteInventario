import useSWR from 'swr';
import { URI } from '../../constants/enums';
import clienteService from '../../services/clienteService';
import useError from '../use-error';

const useCliente = (idCliente) => {
  const URL = idCliente ? `${URI.CLIENTES}/${idCliente}` : null;
  const { data: cliente, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !cliente && !error;

  const subirFoto = async (item) => {
    await clienteService.subirFoto(item);
    mutate();
  };

  return { cliente, isLoading, subirFoto };
};

export default useCliente;
