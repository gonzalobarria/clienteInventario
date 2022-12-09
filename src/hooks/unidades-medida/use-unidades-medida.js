import useSWRImmutable from 'swr/immutable';
import { URI } from '../../constants/enums';
import useError from '../use-error';

const useUnidadesMedida = () => {
  const { data: unidadesMedida, error } = useSWRImmutable(URI.UNIDADES_MEDIDA);
  useError(error);

  const isLoading = !unidadesMedida && !error;

  return { unidadesMedida, isLoading };
};

export default useUnidadesMedida;
