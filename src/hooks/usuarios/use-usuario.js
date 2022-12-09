import useSWR from 'swr';
import { URI } from '../../constants/enums';
import usuarioService from '../../services/usuarioService';
import useError from '../use-error';

const useUsuario = (idUsuario) => {
  const URL = idUsuario ? `${URI.USUARIOS}/${idUsuario}` : null;
  const { data: usuario, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !usuario && !error;

  const subirFoto = async (item) => {
    await usuarioService.subirFoto(item);
    mutate();
  };

  return { usuario, isLoading, subirFoto };
};

export default useUsuario;
