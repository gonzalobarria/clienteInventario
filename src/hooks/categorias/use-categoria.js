import useSWR from 'swr';
import { URI } from '../../constants/enums';
import categoriaService from '../../services/categoriaService';
import useError from '../use-error';

const useCategoria = (idCategoria) => {
  const URL = idCategoria ? `${URI.CATEGORIAS}/${idCategoria}` : null;
  const { data: categoria, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !categoria && !error;

  const subirFoto = async (item) => {
    await categoriaService.subirFoto(item);
    mutate();
  };

  return { categoria, isLoading, subirFoto };
};

export default useCategoria;
