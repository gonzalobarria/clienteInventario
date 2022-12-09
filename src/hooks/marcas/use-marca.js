import useSWR from 'swr';
import { URI } from '../../constants/enums';
import marcaService from '../../services/marcaService';
import useError from '../use-error';

const useMarca = (idMarca) => {
  const URL = idMarca ? `${URI.MARCAS}/${idMarca}` : null;
  const { data: marca, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !marca && !error;

  const subirFoto = async (item) => {
    await marcaService.subirFoto(item);
    mutate();
  };

  return { marca, isLoading, subirFoto };
};

export default useMarca;
